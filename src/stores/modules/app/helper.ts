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
   */
  asideMenu: {
    itemList: Array<AsideMenuItem>
  }
}

/**
 * 获取应用默认设置
 * @function
 * @returns {AppStore} 包含应用配置和消息队列的应用存储对象
 */
export const getAppDefaultSettings = (): AppStore => {
  return {
    app: {
      delay: import.meta.env.VITE_APP_BASE_DELAY
    },
    messageQueue: [],
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
        },
        {
          title: 'trashcan.text',
          icon: 'trash-can',
          active: false,
          route: '/trash-can'
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
