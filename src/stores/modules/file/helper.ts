import { BasicFile } from '@/types/models'
import { useAppStore } from '..'
import { Concurrent } from '@/utils/functions/queue'
import { ACTION_TYPE } from '@/types/enums'

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
   * 下载队列
   */
  downloadQueue: Concurrent<any>

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

  /**
   * 文件右键菜单项
   */
  fileRightMenuItems: Array<{}>
  /**
   * 上下文右键菜单项
   */
  contextRightMenuItems: Array<{}>
}

/**
 * 获取文件默认设置
 * @function
 * @returns {FileStore} 包含用户信息和令牌的用户存储对象
 */
export const getFileDefaultSettings = (): FileStore => {
  const appStore = useAppStore()
  const maxUploadCount = appStore.app.settings['maxUploadCount']
  const maxDownLoadCount = appStore.app.settings['maxDownLoadCount']

  return {
    loading: false,
    class: {},
    list: [],
    renderList: [],
    view: 'icon',
    itemSize: 121,
    iconViewPageItemNumber: 50,
    classifyTabCurrentPage: {},
    uploadChunkQueue: [],
    search: '',
    selectedList: [],
    fileRightMenuItems: [
      {
        text: 'right.menu.open.text',
        icon: 'mdi-open-in-app',
        actionType: ACTION_TYPE.OPEN,
        shortcutKey: 'Enter'
      },
      {
        text: 'right.menu.download.text',
        icon: 'mdi-cloud-download',
        actionType: ACTION_TYPE.DOWNLOAD
      },
      {
        text: 'right.menu.shared.text',
        icon: 'mdi-account-multiple',
        actionType: ACTION_TYPE.SHARE
      },
      {
        text: 'right.menu.property.text',
        icon: 'mdi-wrench',
        actionType: ACTION_TYPE.PROPERTY,
        shortcutKey: 'Alt+Enter'
      },
      {
        text: 'right.menu.delete.text',
        icon: 'mdi-delete',
        actionType: ACTION_TYPE.DELETE,
        color: 'red',
        shortcutKey: 'Ctrl+D'
      }
    ],
    contextRightMenuItems: [
      {
        text: 'right.menu.refresh.text',
        icon: 'mdi-refresh',
        actionType: ACTION_TYPE.REFRESH
      },
      {
        text: 'right.menu.upload.text',
        icon: 'mdi-cloud-upload',
        actionType: ACTION_TYPE.UPLOAD,
        shortcutKey: ''
      },
      {
        text: 'right.menu.newFolder.text',
        icon: 'mdi-folder-plus-outline',
        actionType: ACTION_TYPE.NEW_FOLDER
      },
      {
        text: 'right.menu.viewMode.text',
        icon: 'mdi-view-comfy',
        actionType: ACTION_TYPE.VIEW_MODE,
        shortcutKey: ''
      },
      {
        text: 'right.menu.sortMode.text',
        icon: 'mdi-sort',
        actionType: ACTION_TYPE.SORT_MODE,
        shortcutKey: ''
      }
    ],
    uploadQueue: new Concurrent(maxUploadCount),
    downloadQueue: new Concurrent(maxDownLoadCount)
  }
}
