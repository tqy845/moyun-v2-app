import { fileDownloadByName, fileDeleteByName } from '@/api'
import { pinyin } from 'pinyin-pro'
import { invoke } from '@tauri-apps/api'
import { useFileStore, useUserStore } from '@/stores'
import { calculateFileSlices } from '@/utils/functions/file/helper'
/**
 * 单个分片大小
 */
const CHUNK_SIZE = 1024 * 1024 * 10
/**
 * 线程数量
 */
const THREAD_COUNT = navigator.hardwareConcurrency || 4

/**
 * 文件属性
 */
export interface FileProperties {
  name: string
  path: string
  isDirectory: boolean
  size: number
  lastModified: Date
  extension: string
  icon?: string
}

/**
 * 分片上传对象
 */
export class UploadChunk {
  index?: number
  file: File
  power?: number
  status?: 'success' | 'error' | 'await' | 'uploading' | 'init' | 're-upload' | 'cancel'
  deleting?: boolean
  uploadStatus?: {
    success: number
    error: number
  }

  constructor(file: File, index: number = 0) {
    this.index = index
    this.file = file
    this.power = 0
    this.status = 'await'
    this.deleting = false
    this.uploadStatus = {
      success: 0,
      error: 0
    }
  }

  /**
   * 置顶
   */
  top(): void {
    const fileStore = useFileStore()
    fileStore.uploadTop(this.file.name)
  }

  /**
   * 分片
   */
  partUpload(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const userStore = useUserStore()
      const totalChunkCount = calculateFileSlices(this.file.size)
      const workerChunkCount = Math.ceil(totalChunkCount / THREAD_COUNT)
      let uploadedChunkCount = 0 // 跟踪已上传的分片数量
      // 前置任务
      this.status = 'init'
      // 置顶
      this.top()

      // 开启多线程
      for (let i = 0; i < THREAD_COUNT; i++) {
        // 创建新线程
        const worker = new Worker(new URL('@/utils/functions/file/worker.ts', import.meta.url), {
          type: 'module'
        })

        // 计算文件分片位置
        const startIndex = i * workerChunkCount
        let endIndex = startIndex + workerChunkCount
        if (endIndex > totalChunkCount) {
          endIndex = totalChunkCount
          break
        }

        // 给worker线程发送数据，以分片和上传
        console.log('发送数据', i)

        this.status = 'uploading'
        worker.postMessage({
          // 文件信息
          file: this.file,
          CHUNK_SIZE,
          startIndex,
          endIndex,
          index: i,
          token: userStore.token
        })
        // 接收worker线程返回
        worker.onmessage = async (e) => {
          console.log('接收worker返回内容', e.data)
          // 计数器+1
          uploadedChunkCount++
          if (e.data) {
            // 上传成功，更新文件上传进度
            this.power = (uploadedChunkCount / totalChunkCount) * 100

            // 判断是否已经上传完毕
            if (uploadedChunkCount === totalChunkCount) {
              if (this.uploadStatus?.error) {
                this.status = 'error'
              } else {
                this.status = 'success'
              }
              console.log('文件 ' + this.file.name + ' 上传完成')
              worker.terminate()
              resolve(true)
            }
          } else {
            // 上传失败
            this.status = 'error'
            worker.terminate()
            reject(false)
          }
        }
      }
    })
  }

  /**
   * 取消上传
   */
  cancelUpload(): void {
    this.status = 'cancel'
    // 实现取消上传的逻辑
  }

  /**
   * 删除文件
   * @param deleteLocal 是否删除本地缓存
   */
  async delete(deleteLocal: boolean = true): Promise<boolean> {
    const fileStore = useFileStore()
    const { code } = await fileDeleteByName(this.file.name)
    if (code === 200 && deleteLocal) {
      fileStore.delete(this.file.name)
    }
    return code === 200
  }
}

/**
 * 文件类
 */
export class BasicFile {
  /**
   * 文件名
   */
  name: string

  /**
   * 文件图标
   */
  icon: string

  /**
   * 扩展名
   */
  extension: string

  /**
   * 路径
   */
  path: string

  /**
   * 是否为目录
   */
  isDirectory: boolean

  /**
   * 大小
   */
  size: number

  /**
   * 更新时间
   */
  lastModified: Date

  /**
   * 拼音
   */
  pinyin: string

  /**
   * 下载进度或状态
   */
  power?: string | number

  /**
   * 创建一个新的 File 实例
   * @param params 文件属性，包括名称、图标和类型。
   */
  constructor(params: FileProperties) {
    this.name = params.name
    this.icon = params.icon ?? ''
    this.extension = params.extension
    this.path = params.path
    this.isDirectory = params.isDirectory
    this.size = params.size
    this.lastModified = params.lastModified
    this.pinyin = pinyin(params.name, { toneType: 'none' }) // 'han yu pin yin'
  }

  /**
   * 下载文件
   * @returns {Promise<void>} 下载完成后的 Promise。
   */
  async download(): Promise<void> {
    this.power = 'awaiting'
    const {
      data: { blob }
    } = await fileDownloadByName<{ blob: Blob }>(this.name, (progress: number) => {
      this.power = progress
    })
    // await invoke('save_blob', { blob })
    const result = await invoke('greet', { name: `123` })
    console.log(result)
    // FileSaver.saveAs(blob, this.name)
    this.power = 'completed'
  }

  /**
   * 重命名文件
   * @param newName 新的文件名称。
   */
  async rename(newName: string): Promise<void> {
    this.name = newName
  }

  /**
   * 删除文件
   * @param deleteLocal 是否删除本地缓存
   */
  async delete(deleteLocal: boolean = true): Promise<boolean> {
    const fileStore = useFileStore()
    const { code } = await fileDeleteByName(this.name)
    if (code === 200 && deleteLocal) {
      fileStore.delete(this.name)
    }
    return code === 200
  }
}

/**
 * 文件夹的类，继承自 File
 */
export class Folder extends BasicFile {
  /**
   * 创建一个新的 Folder 实例
   * @param params 文件夹属性，包括名称、图标和类型。
   */
  constructor(params: FileProperties) {
    super(params)
  }
}

/**
 * 文件块
 */
export interface FileChunk {
  start: number
  end: number
  index: number
  hash: string
  chunk: Blob
}
