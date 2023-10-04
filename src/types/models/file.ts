import { fileDownloadByName, fileDeleteByName, fetchFileChunkNames, fetchFileChunk } from '@/api'
import { pinyin } from 'pinyin-pro'
import { invoke } from '@tauri-apps/api'
import { useFileStore, useUserStore } from '@/stores'
import { calculateFileSlices, mergeChunks, mergeUint8Arrays } from '@/utils/functions/file/helper'
import { ACTION_TYPE } from '../enums'
import {
  BaseDirectory,
  BinaryFileContents,
  createDir,
  exists,
  readBinaryFile,
  removeDir,
  writeBinaryFile
} from '@tauri-apps/api/fs'

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
  /**
   * 索引
   */
  index?: number
  /**
   * 文件
   */
  file: File
  /**
   * 进度
   */
  power?: number
  /**
   * 状态
   */
  status?: 'success' | 'error' | 'await' | 'init' | 're-upload' | 'cancel'
  /**
   * 是否删除中
   */
  deleting?: boolean
  /**
   * 当前worker线程数量
   */
  workerCount?: number
  /**
   * 总分片数量
   */
  private totalChunkCount?: number
  /**
   * 已上传分片数量
   */
  private uploadedChunkCount?: number
  /**
   * worker线程分片数量
   */
  private workerChunkCount?: number

  constructor(file: File, index: number = 0) {
    this.index = index
    this.file = file
    this.power = 0
    this.status = 'await'
    this.deleting = false
  }

  /**
   * 置顶
   */
  top(): void {
    const fileStore = useFileStore()
    fileStore.uploadTop(this.file.name)
  }

  /**
   * 上传
   */
  async upload(): Promise<boolean> {
    // 置顶
    this.top()
    // 分片上传
    return await this.partUpload()
  }

  /**
   * 取消上传
   */
  cancelUpload(): void {
    this.status = 'cancel'
  }

  /**
   * 重新上传
   */
  reupload(): void {
    this.power = 0
    this.partUpload()
  }

  /**
   * 删除文件
   * @param deleteLocal 是否删除本地缓存
   */
  async delete(deleteLocal: boolean = true): Promise<boolean> {
    this.deleting = true
    const fileStore = useFileStore()
    const { code } = await fileDeleteByName(this.file.name)
    if (code === 200 && deleteLocal) {
      fileStore.deleteCache(this.file.name)
    }
    this.deleting = false
    return code === 200
  }

  /**
   * 用户是否取消上传
   * @param callback 回调函数
   */
  private isCancel = (callback: Function) => {
    if (this.status === 'cancel') {
      // 如果用户停止上传
      callback()
    } else {
      setTimeout(() => this.isCancel(callback), 300)
    }
  }

  /**
   * 分片上传
   */
  private partUpload(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      // 前置任务
      this.status = 'init'
      this.uploadedChunkCount = 0
      this.totalChunkCount = calculateFileSlices(this.file.size)
      this.workerCount = 0
      this.workerChunkCount = Math.ceil(this.totalChunkCount / THREAD_COUNT)

      const userStore = useUserStore()
      const requestId = Math.random().toString(36).substring(7) // 生成一个唯一的请求标识

      // 开启多线程
      for (let i = 0; i < THREAD_COUNT; i++) {
        // 计算分片位置
        const startIndex = i * this.workerChunkCount
        let endIndex = startIndex + this.workerChunkCount
        if (endIndex > this.totalChunkCount) {
          endIndex = this.totalChunkCount
          break
        }

        // 创建worker线程
        const worker = new Worker(
          new URL('@/utils/functions/file/upload-worker.ts', import.meta.url),
          {
            type: 'module'
          }
        )
        // 创建新工作者时增加 workerCount
        this.workerCount++

        // 递归检查用户是否取消上传
        this.isCancel(() => {
          worker.postMessage({ type: 'cancel' })
        })

        worker.postMessage({
          // 文件信息
          file: this.file,
          CHUNK_SIZE,
          startIndex,
          endIndex,
          index: i,
          token: userStore.token,
          requestId,
          url: `http://localhost/system/user/file/chunk`
        })

        // 接收worker线程返回
        worker.onmessage = async (e) => {
          const result = this.isCompleted(worker, e.data)
          if (result === ACTION_TYPE.COMPLETE) {
            resolve(true)
          } else if (result === ACTION_TYPE.ERROR) {
            reject(e.data)
          }
        }
      }
    })
  }

  /**
   * 是否已经上传完成
   * @param worker worker实例
   * @param statusCode 状态码
   */
  private isCompleted(worker: Worker, statusCode: number) {
    this.workerCount!--
    worker.terminate()

    if (statusCode === ACTION_TYPE.CANCEL) {
      // 取消上传
      return ACTION_TYPE.CANCEL
    } else if (statusCode) {
      // 上传成功，更新文件上传进度
      this.uploadedChunkCount! += this.workerChunkCount!
      this.power = (this.uploadedChunkCount! / this.totalChunkCount!) * 100
      // 判断是否已经上传完毕
      if (this.uploadedChunkCount === this.totalChunkCount) {
        this.status = 'success'
        // console.log('文件 ' + this.file.name + ' 上传完成')
        return ACTION_TYPE.COMPLETE
      }
    } else {
      // 上传失败
      this.status = 'error'
      return ACTION_TYPE.ERROR
    }

    return ACTION_TYPE.UPLOAD
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
    const fileStore = useFileStore()
    if (!this.isDirectory) {
      const worker = new Worker(
        new URL('@/utils/functions/file/download-worker.ts', import.meta.url),
        {
          type: 'module'
        }
      )

      const userStore = useUserStore()
      // const requestId = Math.random().toString(36).substring(7) // 生成一个唯一的请求标识

      worker.postMessage({
        // 文件信息
        fileName: this.name,
        token: userStore.token,
        chunkNamesRequest: {
          url: `http://localhost/system/user/file`
        },
        chunkNameRequest: {
          url: `http://localhost/system/user/file/chunk`
        }
      })

      let count = 1
      let flag = false
      worker.onmessage = async (e) => {
        const { chunk, chunkName, chunkNames } = e.data
        const path = this.name.replace('.' + this.extension, '') + '_part\\'
        // console.log('chunk = ', chunk)
        console.log('进度 = ', (count / chunkNames.length) * 100)

        count++
        // 分片写入本地磁盘
        if (!flag || !(await exists(path, { dir: BaseDirectory.Desktop }))) {
          await createDir(path, {
            dir: BaseDirectory.Desktop,
            recursive: true
          })
          flag = true
        }

        await writeBinaryFile(path + chunkName, chunk, {
          dir: BaseDirectory.Desktop
        })

        // 判断分片是否传输完毕
        if (count === chunkNames.length) {
          // 合并分片
          worker.terminate()
          this.mergedChunks(chunkNames, path)
          console.log('完成')
        }
      }
    }
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
      fileStore.deleteCache(this.name)
    }
    return code === 200
  }

  /**
   * 分片合并
   * @param chunkNames 分片名列表
   */
  mergedChunks = async (chunkNames: Array<string>, path: string) => {
    try {
      console.log('合并')

      const mergedContent = await Promise.all(
        chunkNames.map(async (chunkName) => {
          const content = await readBinaryFile(path + chunkName, {
            dir: BaseDirectory.Desktop
          })
          return new Uint8Array(content)
        })
      )

      // 合并所有文件内容
      const totalLength = mergedContent.reduce((acc, chunk) => acc + chunk.length, 0)
      const mergedArray = new Uint8Array(Math.ceil(totalLength))
      let offset = 0
      for (const chunk of mergedContent) {
        mergedArray.set(chunk, offset)
        offset += chunk.length
      }

      // 将合并后的内容写入输出文件
      await writeBinaryFile(this.name, mergedArray, { dir: BaseDirectory.Desktop })
      removeDir(path, { dir: BaseDirectory.Desktop, recursive: true })
      console.log('Files merged successfully.')
    } catch (error) {
      console.error('Error merging files:', error)
    }
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
