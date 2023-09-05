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
    messageQueue: []
  }
}
