/**
 * 文件工具库
 */

import { fileDownloadByName } from '@/api'
import { pinyin } from 'pinyin-pro'
import { invoke } from '@tauri-apps/api'
import { writeBinaryFile, BaseDirectory } from '@tauri-apps/api/fs'
import { FileProperties, UploadChunk } from '@/types/models'
import { FILE_ICON_TYPE } from '@/types/enums'
import { useAppStore, useFileStore } from '@/stores'
import { determineMaxChunks } from './helper'

const CHUNK_SIZE = 1024 * 1024 * 10 // 单个分片大小
const THREAD_COUNT = navigator.hardwareConcurrency || 4

/**
 * 文件上传
 */
const upload = async (fileList: Array<File>) => {
  const fileStore = useFileStore()
  const appStore = useAppStore()

  // 过滤已存在的文件
  const fileNameList = fileStore.fileUploadList.map((it) => it.file.name)

  for (const iterator of fileList) {
    console.log(fileNameList, iterator.name)

    if (!fileNameList.includes(iterator.name)) {
      fileStore.fileUploadList = [
        {
          power: 0,
          file: iterator,
          status: 'await'
        },
        ...fileStore.fileUploadList
      ]
    }
  }

  // 创建一个队列来管理文件上传
  const uploadQueue: Array<Promise<boolean>> = []
  let count = 0

  // 将文件添加到队列
  const timer = setInterval(async () => {
    if (count < fileStore.fileUploadList.length) {
      execTask()
    } else if (uploadQueue.length === 0) {
      console.log('所有任务已完成')
      clearInterval(timer)
      fileStore.list()
    }
    console.log('扫描上传任务')
  }, 1000)

  const execTask = () => {
    while (uploadQueue.length < appStore.app.settings['maxUploadCount']) {
      if (count >= fileStore.fileUploadList.length) break
      let basicFile = fileStore.fileUploadList[count++]

      while (basicFile.status !== 'await' && count < fileStore.fileUploadList.length) {
        basicFile = fileStore.fileUploadList[count]
        if (count < fileStore.fileUploadList.length) count++
      }

      if (basicFile.status === 'await') {
        uploadQueue.push(
          uploadChunk(basicFile).finally(() => {
            uploadQueue.shift()
            execTask()
          })
        )
      }
    }
  }
}

/**
 * 上传分片
 * @param chunk 分片
 */
export const uploadChunk = (uploadChunk: UploadChunk) => {
  return new Promise<boolean>((resolve, reject) => {
    const fileStore = useFileStore()
    const appStore = useAppStore()

    uploadChunk.status = 'init'
    const { file } = uploadChunk

    // 计算 totalChunkCount，但限制最大值
    const totalChunkCount = determineMaxChunks(file.size)
    const workerChunkCount = Math.ceil(totalChunkCount / THREAD_COUNT)
    let uploadedChunkCount = 0 // 用于跟踪已上传的分片数量

    for (let i = 0; i < THREAD_COUNT; i++) {
      const worker = new Worker(new URL('./worker.ts', import.meta.url), {
        type: 'module'
      })

      const startIndex = i * workerChunkCount
      let endIndex = startIndex + workerChunkCount
      if (endIndex > totalChunkCount) {
        endIndex = totalChunkCount
      }

      worker.onmessage = async (e) => {
        uploadChunk.status = 'uploading'
        const { chunk, ...args } = e.data
        const formData = new FormData()
        formData.append('file', chunk, `chunk_${i}`)
        formData.append('chunkSize', String(CHUNK_SIZE))
        for (const key in args) {
          if (Object.hasOwn(args, key)) {
            const element = args[key]
            formData.append(key, element)
          }
        }
        if (await fileStore.uploadChunk(formData)) {
          // console.log('线程 ' + i + ' 的分片上传成功')
          uploadedChunkCount++ // 分片上传成功，增加已上传分片的数量

          const progress = (uploadedChunkCount / totalChunkCount) * 100
          uploadChunk.power = progress // 设置文件上传进度

          if (uploadedChunkCount === totalChunkCount) {
            uploadChunk.status = 'complete'
            // console.log('文件 ' + file.name + ' 上传完成')
            appStore.notification('文件 ' + file.name + ' 上传完成')
            worker.terminate()
            resolve(true)
          }
        } else {
          uploadChunk.status = 'error'
          // console.log('文件 ' + file.name + ' 上传失败')
          appStore.notification('文件 ' + file.name + ' 上传失败')
          reject(false)
        }
      }

      worker.postMessage({
        file,
        CHUNK_SIZE,
        startIndex,
        endIndex,
        totalChunkCount
      })
    }
  })
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
 * 是否为文档类型
 * @param extension 文件后缀名
 * @description 判断是否为办公三件套或者普通文档
 */
const isDocument = (extension: string) => {
  const documentExtensions = [
    'doc',
    'docx',
    'pdf',
    'ppt',
    'pptx',
    'xls',
    'xlsx',
    'odt',
    'txt',
    'rtf'
  ]
  return documentExtensions.includes(extension.toLowerCase()) // 忽略大小写
}

/**
 * 是否为图片类型
 * @param extension 文件后缀名
 * @description 判断是否为图片类型
 */
const isPicture = (extension: string) => {
  const pictureExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp', 'tiff']
  return pictureExtensions.includes(extension.toLowerCase()) // 忽略大小写
}

/**
 * 是否为音/视频类型
 * @param extension 文件后缀名
 * @description 判断是否为音/视频类型
 */
const isMedia = (extension: string) => {
  const mediaExtensions = ['mp3', 'wav', 'ogg', 'mp4', 'avi', 'mkv', 'mov', 'wmv']
  return mediaExtensions.includes(extension.toLowerCase()) // 忽略大小写
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
  listViewMouseWheel,
  isDocument,
  isPicture,
  isMedia
}

export default fileUtils
