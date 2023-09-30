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
   * 文件分类信息列表
   * @type {Array<BasicFile>}
   */
  fileClassify: { [key: string]: Array<BasicFile> }

  /**
   * 文件列表
   * @type {Array<BasicFile>}
   */
  fileList: Array<BasicFile>

  /**
   * 当前文件列表
   * @type {Array<BasicFile>}
   */
  currentFileList: Array<BasicFile>

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

  /**
   * icon视图一页条目数
   * @type {number}
   */
  iconViewPageItemNumber: number

  /**
   * 分类菜单tab
   */
  classifyTabList: { [key: string]: number }
}

/**
 * 获取文件默认设置
 * @function
 * @returns {FileStore} 包含用户信息和令牌的用户存储对象
 */
export const getFileDefaultSettings = (): FileStore => {
  return {
    loading: false,
    fileClassify: {
      document: [],
      media: []
    },
    fileList: [],
    currentFileList: [],
    fileUploadList: [],
    fileView: 'icon',
    fileItemSize: 121,
    iconViewPageItemNumber: 50,
    classifyTabList: {}
  }
}
