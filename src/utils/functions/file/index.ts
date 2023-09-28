/**
 * 文件工具库
 */

import { fileDownloadByName } from '@/api'
import { pinyin } from 'pinyin-pro'
import { invoke } from '@tauri-apps/api'
import { writeBinaryFile, BaseDirectory } from '@tauri-apps/api/fs'
import { File as _File, FileChunk, FileProperties } from '@/types/models'
import { FILE_ICON_TYPE } from '@/types/enums'
import { useAppStore, useFileStore } from '@/stores'

const CHUNK_SIZE = 1024 * 1024 * 10 // 单个分片大小
const THREAD_COUNT = navigator.hardwareConcurrency || 4

/**
 * 文件上传
 */
const upload = async (fileList: Array<File>) => {
  const fileStore = useFileStore()
  const appStore = useAppStore()
  for (const file of fileList) {
    const totalChunkCount = Math.ceil(file.size / CHUNK_SIZE)
    const workerChunkCount = Math.ceil(totalChunkCount / THREAD_COUNT)
    const workers: Array<Worker> = []

    // 使用 Promise 来跟踪每个线程的上传
    const uploadPromises = []

    for (let i = 0; i < THREAD_COUNT; i++) {
      const worker = new Worker(new URL('./worker.ts', import.meta.url), {
        type: 'module'
      })
      const startIndex = i * workerChunkCount
      let endIndex = startIndex + workerChunkCount
      if (endIndex > totalChunkCount) {
        endIndex = totalChunkCount
        break
      }

      // 为每个线程的上传创建一个 Promise
      const uploadPromise = new Promise((resolve) => {
        worker.onmessage = async (e) => {
          const { chunk, ...args } = e.data
          const formData = new FormData()
          formData.append('file', chunk, `chunk_${i}`)
          formData.append('chunkSize', String(CHUNK_SIZE))
          for (const key in args) {
            if (Object.prototype.hasOwnProperty.call(args, key)) {
              const element = args[key]
              formData.append(key, element)
            }
          }

          if (await fileStore.uploadChunk(formData)) {
            console.log('线程 ' + i + ' 的分片上传成功')
            resolve(true)
          } else {
            resolve(false)
          }
        }

        worker.postMessage({
          file,
          CHUNK_SIZE,
          startIndex,
          endIndex,
          totalChunkCount
        })
      })

      uploadPromises.push(uploadPromise)
      workers.push(worker)
    }

    // 等待所有线程的上传完成
    await Promise.all(uploadPromises)

    // 终止所有线程
    workers.forEach((w) => w.terminate())

    console.log('文件 ' + file.name + ' 上传完成')
    appStore.notification('文件 ' + file.name + ' 上传完成')
  }
}

/**
 * 文件下载
 */
const download = (file: File) => {}

/**
 * 获取文件Icon
 * @param fileProperties 文件属性
 */
const getIcon = (fileProperties: FileProperties) => {
  if (fileProperties.isDirectory) {
    return fileProperties.size
      ? FILE_ICON_TYPE[fileProperties.extension + '-size']
      : FILE_ICON_TYPE[fileProperties.extension]
  }
  return FILE_ICON_TYPE[fileProperties.extension] || FILE_ICON_TYPE['default']
}

/**
 * 单位转换
 * @param fileSizeInBytes 字节
 */
const formatSize = (fileSizeInBytes: number) => {
  if (fileSizeInBytes < 1024) {
    return fileSizeInBytes + ' Bytes'
  } else if (fileSizeInBytes < 1024 * 1024) {
    // 转为KB
    const fileSizeInKB = fileSizeInBytes / 1024
    return fileSizeInKB.toFixed(2) + ' KB'
  } else if (fileSizeInBytes < 1024 * 1024 * 1024) {
    // 转为MB
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024)
    return fileSizeInMB.toFixed(2) + ' MB'
  } else {
    // 大于1GB的情况，转为GB
    const fileSizeInGB = fileSizeInBytes / (1024 * 1024 * 1024)
    return fileSizeInGB.toFixed(2) + ' GB'
  }
}

/**
 * 图标视图鼠标滚动事件
 * @param event 滚动事件
 */
const iconViewMouseWheel = (event: WheelEvent) => {
  const fileStore = useFileStore()

  // 检查 Ctrl 键是否按下
  if (event.ctrlKey) {
    // 阻止默认滚动行为，以防止页面滚动
    event.preventDefault()

    // 获取滚动方向
    const delta = event.deltaY

    // 根据滚动方向执行相应操作
    if (delta > 0) {
      // 向下滚动
      if (fileStore.fileItemSize > 80) {
        fileStore.fileItemSize -= 3
      } else {
        fileStore.fileView = 'list'
      }
      // 在这里执行你的操作
    } else if (delta < 0) {
      // 向上滚动
      if (fileStore.fileItemSize < 300) {
        fileStore.fileItemSize += 3
      }
    }
  }
}

/**
 * 列表视图鼠标滚动事件
 * @param event 滚动事件
 */
const listViewMouseWheel = (event: WheelEvent) => {
  const fileStore = useFileStore()

  // 检查 Ctrl 键是否按下
  if (event.ctrlKey) {
    // 阻止默认滚动行为，以防止页面滚动
    event.preventDefault()

    // 获取滚动方向
    const delta = event.deltaY

    // 根据滚动方向执行相应操作
    if (delta < 0) {
      // 向上滚动
      fileStore.fileView = 'icon'
    }
  }
}

/**
 * 文件Utils
 */
const fileUtils = {
  upload,
  download,
  getIcon,
  formatSize,
  iconViewMouseWheel,
  listViewMouseWheel
}

export default fileUtils
