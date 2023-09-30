import { UploadChunk, BasicFile } from '@/types/models'

/**
 * 文件存储对象接口
 * @interface FileStore
 */
export interface FileStore {
  /**
   * 加载中
   * @type {boolean}
   */
  loading: boolean

  /**
   * 文件信息列表
   * @type {Array<BasicFile>}
   */
  fileList: Array<BasicFile>

  /**
   * 临时文件信息列表
   * @type {Array<BasicFile>}
   */
  tempFileList: Array<BasicFile>

  /**
   * 文件上传列表
   * @type {Array<UploadChunk>}
   */
  fileUploadList: Array<UploadChunk>

  /**
   * 文件视图
   * @type {'icon' | 'list'}
   */
  fileView: 'icon' | 'list'
  /**
   * 文件项大小
   * @type {number}
   */
  fileItemSize: number
}

/**
 * 获取文件默认设置
 * @function
 * @returns {FileStore} 包含用户信息和令牌的用户存储对象
 */
export const getFileDefaultSettings = (): FileStore => {
  return {
    loading: false,
    fileList: [],
    tempFileList: [],
    fileUploadList: [],
    fileView: 'icon',
    fileItemSize: 121
  }
}
