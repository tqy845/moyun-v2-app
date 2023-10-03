/**
 * 文件工具库
 */

import { FileProperties, UploadChunk } from '@/types/models'
import { FILE_ICON_TYPE } from '@/types/enums'
import { useAppStore, useFileStore } from '@/stores'

/**
 * 文件上传
 * @param fileList 原生文件列表
 */
const upload = async (fileList: Array<File>) => {
  const fileStore = useFileStore()
  const appStore = useAppStore()

  return new Promise<boolean>((resolve, reject) => {
    // 过滤已存在的文件
    const fileNameList = fileStore.uploadQueue.all.map((it) => it.file.name)
    for (const file of fileList) {
      if (!fileNameList.includes(file.name)) {
        // 新任务
        const task = new UploadChunk(file, fileStore.uploadQueue.all.length + 1)
        fileStore.uploadQueue.add(task, 'upload')
        appStore.requestQueue[file.name] = []
      }
    }

    // 等待全部任务
    fileStore.uploadQueue
      .waitForAll()
      .then(() => {
        resolve(true)
      })
      .catch((error) => {
        reject(error)
      })
      .finally(() => {
        fileStore.fetch()
        console.log('完成')
      })
  })
}

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
      if (fileStore.itemSize > 80) {
        fileStore.itemSize -= 3
      } else {
        fileStore.view = 'list'
      }
      // 在这里执行你的操作
    } else if (delta < 0) {
      // 向上滚动
      if (fileStore.itemSize < 300) {
        fileStore.itemSize += 3
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
      fileStore.view = 'icon'
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
 * 是否为多媒体类型
 * @param extension 文件后缀名
 * @description 判断是否为多媒体类型
 */
const isMedia = (extension: string) => {
  const mediaExtensions = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'bmp',
    'svg',
    'webp',
    'tiff',
    'mp3',
    'wav',
    'ogg',
    'mp4',
    'avi',
    'mkv',
    'mov',
    'wmv'
  ]
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
  isMedia
}

export default fileUtils
