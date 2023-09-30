/**
 * App Helper
 */

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
  /**
   * 偏好设置
   */
  settings: { [key: string]: any }
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
      menuIndex: {},
      settings: {
        uploadDialogFullscreen: false, // 上传弹窗全屏
        maxUploadCount: 5 // 最大伤上传并发
      }
    },
    messageQueue: [],
    requestQueue: {},
    asideMenu: {
      itemList: [
        {
          title: 'welcome.text',
          icon: 'emoticon',
          active: true,
          route: '/welcome'
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
    }
  }
}
