/**
 * 文件工具库
 */

import { MoYunFile, MoYunFileDto, MoYunUploadDto } from '@/types/models'
import { FileType } from '@/types/enums'
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
  switch (_extension.toLowerCase()) {
    // 视频类
    case 'mp4':
    case 'mkv':
    case 'avi':
    case 'flv':
    case 'mov':
    case 'wmv':
      return 'file-video'
    // 音频类
    case 'mp3':
    case 'wav':
    case 'ogg':
    case 'm4a':
      return 'file-music'
    // 图片类
    case 'svg':
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'bmp':
    case 'webp':
    case 'tiff':
      return 'file-image'
    // 表格类
    case 'xls':
    case 'xlsx':
    case 'csv':
      return 'file-excel'
    // 文档类
    case 'txt':
    case 'odt':
    case 'rtf':
      return 'file-document'
    case 'doc':
    case 'docx':
      return 'file-word'
    case 'pdf':
      return 'file-powerpoint'
    // 幻灯片类
    case 'ppt':
    case 'pptx':
      return 'file-eye'
    // 链接类
    case 'url':
      return 'file-link'
    // 压缩文件类
    case 'zip':
    case 'rar':
    case '7z':
    case 'tar':
    case 'gz':
    case 'bz2':
    case 'xz':
    case 'lz':
      return 'folder-zip'
    // 文件夹类
    case 'folder':
      return 'folder'
    case 'folder-file':
      return 'folder-file'
    // 代码类
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
      return 'language-javascript'
    // 数据类
    case 'json':
      return 'code-json'
    case 'xml':
      return 'xml'
    case 'sql':
      return 'database'
    // 程序类
    case 'msi':
    case 'bat':
    case 'sh':
    case 'exe':
      return 'powershell'
    // 光盘类
    case 'iso':
    case 'img':
    case 'dmg':
      return 'disc'
    default:
      return 'file-cloud' // 默认类型
  }
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
 * 定义函数判断文件类型
 * @param extension
 * @param fileType
 * const extension = 'pdf'
 * const fileType = FileType.Document
 *
 * if (isType(extension, fileType)) {
 *   console.log(`The file with extension ${extension} is a ${fileType} type.`)
 * } else {
 *   console.log(`The file with extension ${extension} is not a ${fileType} type.`)
 * }
 */
const isType = (extension: string, fileType: string) => {
  const extensions: { [key: string]: Array<string> } = {
    Media: [
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
    ],
    Document: ['doc', 'docx', 'pdf', 'odt', 'txt', 'rtf', 'xls', 'xlsx', 'csv', 'ppt', 'pptx'],
    Code: [
      'json',
      'sql',
      'xml',
      'js',
      'ts',
      'css',
      'html',
      'php',
      'java',
      'go',
      'f90',
      'c',
      'kt',
      'md',
      'cpp',
      'c#',
      'lua',
      'xaml',
      'py',
      'r',
      'rb',
      'rs',
      'swift'
    ],
    Application: ['exe', 'sh', 'bat'],
    Folder: ['folder'],
    Ghost: ['iso', 'img', 'dmg'],
    Zip: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz', 'lz']
  }
  return extensions[fileType]?.includes(extension.toLowerCase())
}

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
  isType
}

export default fileUtils
