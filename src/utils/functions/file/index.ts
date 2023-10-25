/**
 * 文件工具库
 */

import { MoYunFile, MoYunFileDto, MoYunUploadDto } from '@/types/models'
import { FileExtension, FileType } from '@/types/enums'
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
        const task = new MoYunUploadDto(file, fileStore.uploadQueue.all.length + 1)
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
 * 下载文件
 */
const download = () => {}

/**
 * 生成文件Icon
 * @param file 文件
 */
const generateIcon = (file: MoYunFile) => {
  const { extension, isDirectory, size } = file
  let _extension = extension

  if (isDirectory) {
    _extension = size ? 'folder' : 'folder-file'
  }

  // 默认类型
  const defaultColor = '#230B64'
  const fileIconColor: { [key: string]: string } = {
    'file-video': '#2746AE',
    'file-music': '#0F86CD',
    'file-image': '#63B3ED',
    'file-excel': '#4CAF50',
    'file-document': '#295595',
    'file-word': '#295595',
    'file-pdf-box': '#CF4646',
    'file-powerpoint': '#D04423',
    'file-link': '#230B64',
    'zip-box': '#FFB347',
    folder: '#FFD700',
    'folder-file': '#FFD700',
    'language-javascript': '#424242',
    'code-json': '#FBC02D',
    xml: '#55915A',
    database: '#B589EC',
    powershell: '#376EC6',
    disc: '#D4DCDC'
  }

  let icon = 'file-cloud'
  let iconColor = defaultColor

  switch (_extension.toLowerCase()) {
    case 'mp4':
    case 'mkv':
    case 'avi':
    case 'flv':
    case 'mov':
    case 'wmv':
      icon = 'file-video'
      break
    case 'mp3':
    case 'wav':
    case 'ogg':
    case 'm4a':
      icon = 'file-music'
      break
    case 'svg':
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'bmp':
    case 'webp':
    case 'tiff':
      icon = 'file-image'
      break
    case 'xls':
    case 'xlsx':
    case 'csv':
      icon = 'file-excel'
      break
    case 'txt':
    case 'odt':
    case 'rtf':
      icon = 'file-document'
      break
    case 'doc':
    case 'docx':
      icon = 'file-word'
      break
    case 'pdf':
      icon = 'file-pdf-box'
      break
    case 'ppt':
    case 'pptx':
      icon = 'file-powerpoint'
      break
    case 'url':
    case 'Ink':
      icon = 'file-link'
      break
    case 'zip':
    case 'rar':
    case '7z':
    case 'tar':
    case 'gz':
    case 'bz2':
    case 'xz':
    case 'lz':
      icon = 'zip-box'
      break
    case 'folder':
      icon = 'folder'
      break
    case 'folder-file':
      icon = 'folder-file'
      break
    case 'js':
    case 'ts':
    case 'css':
    case 'html':
    case 'php':
    case 'java':
    case 'go':
    case 'f90':
    case 'c':
    case 'kt':
    case 'md':
    case 'cpp':
    case 'c#':
    case 'lua':
    case 'xaml':
    case 'py':
    case 'r':
    case 'rb':
    case 'rs':
    case 'swift':
      icon = 'language-javascript'
      break
    case 'json':
      icon = 'code-json'
      break
    case 'xml':
      icon = 'xml'
      break
    case 'sql':
      icon = 'database'
      break
    case 'msi':
    case 'bat':
    case 'sh':
    case 'exe':
      icon = 'powershell'
      break
    case 'iso':
    case 'img':
    case 'dmg':
      icon = 'disc'
      break
  }

  if (fileIconColor[icon]) {
    iconColor = fileIconColor[icon]
  }

  return { icon, iconColor }
}

/**
 * 单位转换
 * @param fileSizeInBytes 字节
 */
const formatSize = (fileSizeInBytes: number) => {
  if (!fileSizeInBytes) return ''
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
      if (fileStore.itemSize > 168) {
        fileStore.itemSize -= 2
      } else {
        fileStore.itemSize = 166
        fileStore.view = 'list'
      }

      // 在这里执行你的操作
    } else if (delta < 0) {
      // 向上滚动
      if (fileStore.itemSize < 320) {
        fileStore.itemSize += 2
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
 * 定义函数判断文件类型
 * @param extension 文件扩展名
 * @param fileType 文件类型
 */
const isType = (extension: string, fileType: string) => {
  return FileExtension[fileType]?.includes(extension.toLowerCase())
}

/**
 * 双击事件
 * @param moYunFile 文件对象
 */
const doubleClick = (moYunFile: MoYunFile) => {
  // console.log(moYunFile)
  const fileStore = useFileStore()

  if (isType(moYunFile.extension, FileType.Folder)) {
    // 清空选中
    fileStore.selectedList.length = 0
    // 文件夹
    const _breadcrumbItems = fileStore.breadcrumbItems
    const _breadcrumbItem = _breadcrumbItems[_breadcrumbItems.length - 1]
    _breadcrumbItem['disabled'] = false

    const _item = {
      title: moYunFile.name,
      path: (_breadcrumbItem.path === '/' ? '' : '/') + moYunFile.name,
      disabled: true
    }

    _breadcrumbItems.push(_item)
    fileStore.fetch()
    // console.log(fileStore.breadcrumbItems)
  }
}

/**
 * 跳转文件夹
 * @param path 路径
 */
const toFolder = (path: string) => {}

/**
 * 文件Utils
 */
const fileUtils = {
  upload,
  download,
  generateIcon,
  formatSize,
  iconViewMouseWheel,
  listViewMouseWheel,
  isType,
  doubleClick,
  toFolder
}

export default fileUtils
