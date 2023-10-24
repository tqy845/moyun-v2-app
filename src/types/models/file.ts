import { fileDownloadByName, fileDeleteByName } from '@/api'
import { pinyin } from 'pinyin-pro'
import { useFileStore, useUserStore } from '@/stores'
import { calculateFileSliceSize } from '@/utils/functions/file/helper'
import { ACTION_TYPE } from '../enums'
import { BaseDirectory, readBinaryFile, removeDir, writeBinaryFile } from '@tauri-apps/api/fs'
import { fileUtils } from '@/utils/functions'

/**
 * 线程数量
 */
const THREAD_COUNT = navigator.hardwareConcurrency || 4

/**
 * 文件属性
 */
export interface MoYunFileDto {
  fileName: string
  path: string
  isDirectory: boolean
  size: number
  modifyDate: string
  type: string
  icon?: string
  isEmpty: boolean
}

/**
 * 分片上传对象
 */
export class MoYunUploadDto {
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
  status?: 'success' | 'error' | 'await' | 'init' | 're-upload' | 'cancel' | 'uploading'
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
    fileStore.top(this.file.name)
  }

  /**
   * 置底
   */
  bottom(): void {
    const fileStore = useFileStore()
    fileStore.bottom(this.file.name)
  }

  /**
   * 上传
   */
  async upload(): Promise<boolean> {
    // 开始上传，置顶
    this.top()
    // 分片上传
    const result = await this.partUpload()
    // 上传完毕，置底
    // this.bottom()
    return result
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
    if (deleteLocal) {
      fileStore.deleteCache(this.file.name)
    }
    this.deleting = false
    const { code } = await fileDeleteByName(this.file.name)
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
      const chunkSize = calculateFileSliceSize(this.file.size)
      this.status = 'init'
      this.uploadedChunkCount = 0
      this.totalChunkCount = Math.ceil(this.file.size / chunkSize)
      this.workerCount = 0
      this.workerChunkCount = Math.ceil(this.totalChunkCount / THREAD_COUNT)

      const userStore = useUserStore()
      const fileStore = useFileStore()
      const requestId = Math.random().toString(36).substring(7) // 生成一个唯一的请求标识

      // 开启多线程
      for (let i = 0; i < THREAD_COUNT; i++) {
        // 计算分片位置
        const startIndex = i * this.workerChunkCount
        let endIndex = startIndex + this.workerChunkCount
        if (endIndex > this.totalChunkCount) {
          endIndex = this.totalChunkCount
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
          chunkSize,
          startIndex,
          endIndex,
          index: i,
          token: userStore.token,
          requestId,
          url: fileStore.uploadAddress,
          totalChunkCount: this.totalChunkCount
        })

        // 接收worker线程返回
        worker.onmessage = async (e) => {
          const result = this.isCompleted(worker, e.data)
          if (result === ACTION_TYPE.COMPLETE) {
            resolve(true)
          } else if (result === ACTION_TYPE.ERROR) {
            reject(e.data.code)
          }
        }
      }
    })
  }

  /**
   * 是否已经上传完成
   * @param worker worker实例
   * @param params 状态码
   */
  private isCompleted(worker: Worker, params: { type: string }) {
    const { type } = params
    switch (type) {
      case ACTION_TYPE.COMPLETE:
        this.workerCount!--
        worker.terminate()
        return ACTION_TYPE.UPLOAD
      case ACTION_TYPE.CANCEL:
        return ACTION_TYPE.CANCEL
      case ACTION_TYPE.ERROR:
        this.status = 'error'
        return ACTION_TYPE.ERROR
      default:
        // 上传成功，更新文件上传进度
        this.uploadedChunkCount!++
        this.status = 'uploading'
        this.power = (this.uploadedChunkCount! / this.totalChunkCount!) * 100
        // 判断是否已经上传完毕
        if (this.uploadedChunkCount === this.totalChunkCount) {
          this.status = 'success'
          return ACTION_TYPE.COMPLETE
        }
        return ACTION_TYPE.UPLOAD
    }
  }
}

/**
 * 文件类
 */
export class MoYunFile {
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
  lastModified: string

  /**
   * 拼音
   */
  pinyin: string

  /**
   * 下载进度或状态
   */
  power?: string | number

  /**
   * 是否为空
   */
  isEmpty: boolean

  /**
   * 创建一个新的 File 实例
   * @param params 文件属性，包括名称、图标和类型。
   */
  constructor(params: MoYunFileDto) {
    this.name = params.fileName
    this.extension = params.type
    this.path = params.path
    this.isDirectory = params.isDirectory
    this.size = params.size
    this.isEmpty = params.isEmpty
    this.pinyin = pinyin(params.fileName, { toneType: 'none' }) // 'han yu pin yin'

    this.lastModified = params.modifyDate
    this.icon = params.icon ?? this.generateIcon
  }

  /**
   * 生成ICON
   */
  get generateIcon() {
    return fileUtils.generateIcon(this)
  }

  /**
   * 下载文件
   * @returns {Promise<void>} 下载完成后的 Promise。
   */
  async download(): Promise<void> {
    const fileStore = useFileStore()
    if (!this.isDirectory) {
      const startByte = 0
      const endByte = this.size
      const { data: blob } = await fileDownloadByName<{ blob: Blob }>(
        this.name,
        startByte,
        endByte,
        (progress: number) => {
          // 计算相对于文件总大小的下载进度
          const totalSize = endByte - startByte
          const downloadedBytes = startByte + totalSize * (progress / 100)

          // 更新进度
          const calc = (downloadedBytes / this.size) * 100

          // 将进度保存到 this.power 中
          this.power = calc
        }
      )
      this.power = 0

      // console.log('chunks = ', uint8Array)
      // for (const iterator of uint8Array) {
      //   console.log(iterator)

      //   invoke('write_u8_array_to_file', {
      //     data: uint8Array,
      //     filePath: `C:/Users/64466/Desktop/${this.name}`
      //   }).then((response) => {
      //     console.log('保存结果 = ', response)
      //     // 清空下载进度
      //     this.power = undefined
      //   })
      // }
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
    console.log('触发删除')

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
  async mergedChunks(chunkNames: Array<string>, path: string) {
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

  /**
   * 双击事件
   */
  async doubleClick() {
    fileUtils.doubleClick(this)
  }
}

/**
 * 文件块
 */
export interface MoYunFileChunk {
  start: number
  end: number
  index: number
  hash: string
  chunk: Blob
}
