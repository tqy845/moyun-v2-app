import { BasicFile } from '@/types/models'
import { useAppStore } from '..'
import { Concurrent } from '@/utils/functions/queue'
import { ACTION_TYPE } from '@/types/enums'
import { RightMenuItem } from '@/types/enums/right-menu'

/**
 * 文件存储对象接口
 * @interface FileStore
 */
export interface FileStore {
  /**
   * 显示上传区域
   */
  show: boolean

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
  fileRightMenuItems: Array<RightMenuItem>
  /**
   * 上下文右键菜单项
   */
  contextRightMenuItems: Array<RightMenuItem>
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
    show: false,
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
        icon: 'open-in-app',
        type: ACTION_TYPE.OPEN,
        shortcutKey: 'Enter',
        color: 'primary'
      },
      {
        text: 'right.menu.download.text',
        icon: 'cloud-download',
        type: ACTION_TYPE.DOWNLOAD,
        color: 'info'
      },
      {
        text: 'right.menu.shared.text',
        icon: 'account-multiple',
        type: ACTION_TYPE.SHARE
      },
      {
        text: 'right.menu.property.text',
        icon: 'wrench',
        type: ACTION_TYPE.PROPERTY,
        shortcutKey: 'Alt+Enter'
      },
      {
        text: 'right.menu.delete.text',
        icon: 'delete',
        type: ACTION_TYPE.DELETE,
        color: 'red',
        shortcutKey: 'Ctrl+D'
      }
    ],
    contextRightMenuItems: [
      {
        text: 'right.menu.refresh.text',
        icon: 'refresh',
        type: ACTION_TYPE.REFRESH,
        color: ''
      },
      { type: 'divider' },
      {
        text: 'right.menu.upload.text',
        icon: 'cloud-upload',
        type: ACTION_TYPE.UPLOAD,
        shortcutKey: ''
      },
      {
        text: 'right.menu.newFolder.text',
        icon: 'folder-plus-outline',
        type: ACTION_TYPE.NEW_FOLDER
      },
      { type: 'divider' },
      {
        text: 'right.menu.viewMode.text',
        icon: 'view-comfy',
        type: ACTION_TYPE.VIEW_MODE,
        shortcutKey: '',
        rightIcon: 'chevron-right'
      },
      {
        text: 'right.menu.sortMode.text',
        icon: 'sort',
        type: ACTION_TYPE.SORT_MODE,
        shortcutKey: '',
        rightIcon: 'chevron-right'
      }
    ],
    uploadQueue: new Concurrent(maxUploadCount),
    downloadQueue: new Concurrent(maxDownLoadCount)
  }
}
