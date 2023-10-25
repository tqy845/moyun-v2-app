import { MoYunFile } from '@/types/models'
import { useAppStore } from '..'
import { Concurrent } from '@/utils/functions/queue'
import { ACTION_TYPE, FileType } from '@/types/enums'
import { RightMenuItem } from '@/types/enums/right-menu'
import { BreadcrumbItem } from '@/types/models/breadcrumb-item.ts'
import { useI18n } from 'vue-i18n'

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
  menuItems: Array<{ text: string; icon: string; path: string; disabled?: boolean }>
  /**
   * 展示的文件菜单选项
   */
  showMenuItems: Array<{ text: string; icon: string; path: string; disabled?: boolean }>

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
  classMenuItems: Array<{ label: string; icon: string; key: string; disabled?: boolean }>
  /**
   * 展示的分类项（不展示的分类会自动收纳到更多）
   */
  showClassMenuItems: Array<{ label: string; icon: string; key: string; disabled?: boolean }>
}

/**
 * 获取文件默认设置
 * @function
 * @returns {FileStore} 包含用户信息和令牌的用户存储对象
 */
export const getFileDefaultSettings = (): FileStore => {
  const appStore = useAppStore()
  const maxUploadCount = appStore['settings']['maxUploadCount']
  const maxDownLoadCount = appStore['settings']['maxDownLoadCount']
  const { t } = useI18n()

  return {
    show: false,
    loading: false,
    class: {},
    list: [],
    renderList: [],
    view: 'icon',
    itemSize: 172,
    iconViewPageItemNumber: 50,
    classifyTabCurrentPage: {},
    uploadChunkQueue: [],
    search: '',
    selectedList: [],
    menuItems: [
      { text: t('menu.file.text'), icon: 'folder', path: '/personal/file', disabled: true },
      {
        text: t('menu.synchro.disk.text'),
        icon: 'harddisk',
        path: '/personal/synchro-disk'
      },
      {
        text: t('menu.trashcan.text'),
        icon: 'trash-can',
        path: '/personal/trash-can'
      }
    ],
    showMenuItems: [
      { text: t('menu.file.text'), icon: 'folder', path: '/personal/file', disabled: true },
      {
        text: t('menu.trashcan.text'),
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
        title: '文件',
        path: '/',
        disabled: false
      }
    ],
    preview: false,
    trashBasket: [],
    classMenuItems: [
      {
        label: t('file.view.iconLabel.secondaryMenu.all.text'),
        icon: 'file',
        key: FileType.All,
        disabled: true
      },
      {
        label: t('file.view.iconLabel.secondaryMenu.document.text'),
        icon: 'briefcase',
        key: FileType.Document
      },
      {
        label: t('file.view.iconLabel.secondaryMenu.multimedia.text'),
        icon: 'multimedia',
        key: FileType.Media
      },
      {
        label: t('file.view.iconLabel.secondaryMenu.application.text'),
        icon: 'application',
        key: FileType.Application
      },
      {
        label: t('file.view.iconLabel.secondaryMenu.gho.text'),
        icon: 'ghost',
        key: FileType.Ghost
      },
      {
        label: t('file.view.iconLabel.secondaryMenu.folder.text'),
        icon: 'folder',
        key: FileType.Folder
      },
      {
        label: t('file.view.iconLabel.secondaryMenu.package.text'),
        icon: 'folder-zip',
        key: FileType.Zip
      }
    ],
    showClassMenuItems: [
      {
        label: t('file.view.iconLabel.secondaryMenu.all.text'),
        icon: 'file',
        key: FileType.All,
        disabled: true
      },
      {
        label: t('file.view.iconLabel.secondaryMenu.document.text'),
        icon: 'briefcase',
        key: FileType.Document
      },
      {
        label: t('file.view.iconLabel.secondaryMenu.multimedia.text'),
        icon: 'multimedia',
        key: FileType.Media
      }
    ]
  }
}
