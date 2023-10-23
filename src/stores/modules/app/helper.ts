/**
 * App Helper
 */

import { FileType } from '@/types/enums'

/**
 * 应用配置接口
 * @interface App
 */
export interface App {
  /**
   * 基本防抖延时
   * @type {number}
   */
  delay: number
  /**
   * 菜单索引
   */
  menuIndex: { [key: string]: any }
}

/**
 * 侧边栏菜单项接口
 * @interface AsideMenuItem
 */
export interface AsideMenuItem {
  title: string
  icon: string
  active: boolean
  route: string
  disabled?: boolean
  show?: boolean
}

/**
 * 应用存储对象接口
 * @interface AppStore
 */
export interface AppStore {
  /**
   * 应用配置信息
   * @type {App}
   */
  app: App

  /**
   * 偏好设置
   */
  settings: { [key: string]: any }

  /**
   * 消息队列
   * @type {Array<any>}
   */
  messageQueue: Array<any>

  /**
   * 侧边栏配置
   * @type {Array<AsideMenuItem>}
   */
  asideMenu: {
    itemList: Array<AsideMenuItem>
  }

  /**
   * 请求队列 AbortController实例管理
   * @type { [key: string]: Array<AbortController>}
   */
  requestQueue: { [key: string]: Array<AbortController> }

  /**
   * 全局搜索关键字
   */
  search: string
  /**
   * 全局搜索结果
   */
  searchResult: Array<{ [key: string]: any }>
  /**
   * 全局搜索记录
   */
  searchRecord: Array<string>
  /**
   * 401权限认证失败
   */
  401: boolean
  /**
   * 切换语言
   */
  changedLanguage: boolean
}

/**
 * 获取应用默认设置
 * @function
 * @returns {AppStore} 包含应用配置和消息队列的应用存储对象
 */
export const getAppDefaultSettings = (): AppStore => {
  return {
    app: {
      delay: import.meta.env.VITE_APP_BASE_DELAY,
      menuIndex: {
        // 二级菜单选中项
        currentSecondMenuTab: {},
        // 文件分类默认选中分类
        currentFileClassifyTab: FileType.All,
        // 文件上传，打开的Tab项
        currentFileUploadOpenTab: ['upload-area']
      }
    },
    settings: {
      maxUploadCount: 3, // 最大上传并发
      maxDownLoadCount: 3, // 最大下载并发
      uploadDialogFullscreen: false, // 上传弹窗全屏
      uploadAutoHideUploadArea: true, // 上传时自动隐藏上传区域
      uploadDialogAutoClose: false, // 上传完毕后自动关闭对话框
      // 右键菜单基本配置
      basicRightMenu: {
        resizable: false, // 可拉伸大小
        decorations: false, // 边框
        contentProtected: false, // 内容隐私不可见（截图的时候不可见）
        skipTaskbar: true, // 任务栏显示该子窗体
        fileDropEnabled: false, // 启用文件拖拽监听
        transparent: true, // 背景透明
        visible: false // 立即可见
      },
      // 基本
      basic: {
        // 显示欢迎页
        launchWelcome: true,
        // 开机自启
        powerOn: false,
        // 自动升级
        autoUpdate: false
      },
      // 传输
      transfer: {},
      // 快捷键
      shortcutKey: {},
      // 同步盘
      synchroDisk: {}
    },
    messageQueue: [],
    requestQueue: {},
    asideMenu: {
      itemList: [
        {
          title: 'welcome.text',
          icon: 'emoticon',
          active: false,
          route: '/welcome',
          disabled: false,
          show: false
        },
        {
          title: 'personal.text',
          icon: 'account-circle',
          active: false,
          route: '/personal'
        }
        // {
        //   title: 'school.text',
        //   icon: 'school',
        //   active: false,
        //   route: '/school'
        // },
        // {
        //   title: 'family.text',
        //   icon: 'home-heart',
        //   active: false,
        //   route: '/family'
        // },
        // {
        //   title: 'rooms.text',
        //   icon: 'sofa-single',
        //   active: false,
        //   route: '/login'
        // }
      ]
    },
    search: '',
    searchResult: [],
    searchRecord: [],
    401: false,
    changedLanguage: false
  }
}
