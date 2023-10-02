import { BasicFile } from '@/types/models'
import { useAppStore } from '..'
import { Concurrent } from '@/utils/functions/queue'

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
  class: { [key: string]: Array<BasicFile> }

  /**
   * 文件列表
   * @type {Array<BasicFile>}
   */
  list: Array<BasicFile>

  /**
   * 渲染列表
   * @type {Array<BasicFile>}
   */
  renderList: Array<BasicFile>

  /**
   * 上传队列
   */
  uploadQueue: Concurrent<any>

  /**
   * 视图
   * @type {'icon' | 'list'}
   */
  view: 'icon' | 'list'

  /**
   * 文件项大小
   * @type {number}
   */
  itemSize: number

  /**
   * icon视图一页条目数
   * @type {number}
   */
  iconViewPageItemNumber: number

  /**
   * 分类菜单tab
   */
  classifyTabCurrentPage: { [key: string]: number }

  /**
   * 延时队列
   */
  uploadChunkQueue: Array<any>

  /**
   * 文件搜索
   */
  search: string

  /**
   * 当前选中的文件
   */
  selectedList: Array<string>
}

/**
 * 获取文件默认设置
 * @function
 * @returns {FileStore} 包含用户信息和令牌的用户存储对象
 */
export const getFileDefaultSettings = (): FileStore => {
  const appStore = useAppStore()
  const maxUploadCount = appStore.app.settings['maxUploadCount']

  return {
    loading: false,
    class: {
      document: [],
      media: []
    },
    list: [],
    renderList: [],
    view: 'icon',
    itemSize: 121,
    iconViewPageItemNumber: 50,
    classifyTabCurrentPage: {},
    uploadChunkQueue: [],
    search: '',
    selectedList: [],
    uploadQueue: new Concurrent(maxUploadCount)
  }
}
