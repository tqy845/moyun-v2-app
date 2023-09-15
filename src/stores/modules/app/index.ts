import { AsideMenuItem } from './helper'
/**
 * App Store
 */

import { defineStore } from 'pinia'
import { type AppStore, getAppDefaultSettings } from './helper'

export const useAppStore = defineStore(`appStore`, {
  state: (): AppStore => getAppDefaultSettings(),
  getters: {
    /**
     * 获取防抖延时
     */
    getDelay: (state) => state.app.delay
  },
  actions: {
    /**
     * 全局消息处理函数
     * @param {string} message - 消息文本
     * @param {'error' | 'success' | 'warning' | 'info'} [type] - 消息类型
     */
    globalMessage(message: string, type?: 'error' | 'success' | 'warning' | 'info'): void {
      this.messageQueue.push({ message, type, show: true })
    },
    /**
     * 更新侧边栏菜单激活项
     */
    updateAsideMenuItem(item: AsideMenuItem) {
      this.asideMenu.itemList.forEach((i) => {
        i.active = i.route === item.route ? true : false
      })
    }
  },
  /**
   * 用户存储对象的数据持久化配置
   * @type {Array<{storage:StorageLike ; paths:Array<string>}>} 持久化配置
   */
  persist: [
    {
      storage: localStorage,
      paths: ['asideMenu']
    }
  ]
})
