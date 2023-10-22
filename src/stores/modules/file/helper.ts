import { MoYunFile } from '@/types/models'
import { useAppStore } from '..'
import { Concurrent } from '@/utils/functions/queue'
import { ACTION_TYPE, FileType } from '@/types/enums'
import { RightMenuItem } from '@/types/enums/right-menu'
import { BreadcrumbItem } from '@/types/models/breadcrumb-item.ts'

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
   * @type {Array<MoYunFile>}
   */
  class: { [key: string]: Array<MoYunFile> }

  /**
   * 文件列表
   * @type {Array<MoYunFile>}
   */
  list: Array<MoYunFile>

  /**
   * 渲染列表
   * @type {Array<MoYunFile>}
   */
  renderList: Array<MoYunFile>

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
   * 文件菜单选项
   */
  menuItems: Array<{ text: string; icon: string; path: string }>

  /**
   * 文件右键菜单项
   */
  fileRightMenuItems: Array<RightMenuItem>
  /**
   * 上下文右键菜单项
   */
  contextRightMenuItems: Array<RightMenuItem>
  /**
   * 面包屑导航项
   */
  breadcrumbItems: Array<BreadcrumbItem>
  /**
   * 文件预览
   */
  preview: boolean
  /**
   * 垃圾篓（回收站）
   */
  trashBasket: Array<MoYunFile>

  /**
   * 菜单分类项
   */
  classMenuItems: Array<{ label: string; icon: string; key: string }>
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
    menuItems: [
      { text: 'menu.file.text', icon: 'folder', path: '/personal/file' },
      // {
      //   text: 'menu.synchro.disk.text',
      //   icon: 'harddisk',
      //   path: '/personal/synchro-disk'
      // },
      {
        text: 'menu.trashcan.text',
        icon: 'trash-can',
        path: '/personal/trash-can'
      }
    ],
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
    downloadQueue: new Concurrent(maxDownLoadCount),
    breadcrumbItems: [
      {
        title: '/',
        path: '/',
        disabled: true
      }
    ],
    preview: false,
    trashBasket: [],
    classMenuItems: [
      {
        label: 'file.view.iconLabel.secondaryMenu.all.text',
        icon: 'file',
        key: FileType.All
      },
      {
        label: 'file.view.iconLabel.secondaryMenu.document.text',
        icon: 'briefcase',
        key: FileType.Document
      },
      {
        label: 'file.view.iconLabel.secondaryMenu.multimedia.text',
        icon: 'multimedia',
        key: FileType.Media
      },
      {
        label: 'file.view.iconLabel.secondaryMenu.application.text',
        icon: 'application',
        key: FileType.Application
      },
      {
        label: 'file.view.iconLabel.secondaryMenu.gho.text',
        icon: 'ghost',
        key: FileType.Ghost
      },
      {
        label: 'file.view.iconLabel.secondaryMenu.folder.text',
        icon: 'folder',
        key: FileType.Folder
      },
      {
        label: 'file.view.iconLabel.secondaryMenu.package.text',
        icon: 'folder-zip',
        key: FileType.Zip
      }
    ]
  }
}
