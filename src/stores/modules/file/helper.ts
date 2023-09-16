import FileSaver from 'file-saver'
import { fileDownloadByName } from '@/api'

/**
 * 文件对象
 * @class File
 */
export class File {
  /**
   * 文件名
   * @type {string}
   */
  name: string
  icon: string
  type: string
  power?: string | number

  constructor(params: { name: string; icon: string; type: string }) {
    this.name = params.name
    this.icon = params.icon
    this.type = params.type
  }

  /**
   * 文件下载
   */
  async download() {
    const {
      data: { blob }
    } = await fileDownloadByName<{ blob: Blob }>(this.name, (progressEvent: ProgressEvent) => {
      this.power = (progressEvent.loaded / progressEvent.total) * 100
    })
    FileSaver.saveAs(blob, this.name)
  }
}

/**
 * 文件存储对象接口
 * @interface FileStore
 */
export interface FileStore {
  /**
   * 文件信息列表
   * @type {Array<File>}
   */
  fileList: Array<File>
}

/**
 * 获取文件默认设置
 * @function
 * @returns {FileStore} 包含用户信息和令牌的用户存储对象
 */
export const getFileDefaultSettings = (): FileStore => {
  return {
    fileList: []
  }
}
