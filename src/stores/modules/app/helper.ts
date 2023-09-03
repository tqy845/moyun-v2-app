/**
 * App Helper
 */

export interface App {
  delay: number // 基本防抖延时
}

export interface AppStore {
  app: App
  messageQueue: Array<any>
}

export const getAppDefaultSettings = (): AppStore => {
  return {
    app: {
      delay: import.meta.env.VITE_APP_BASE_DELAY
    },
    messageQueue: []
  }
}
