/**
 * App Store
 */

import { AsideMenuItem } from './helper'
import {
  isPermissionGranted,
  requestPermission,
  sendNotification
} from '@tauri-apps/api/notification'
import { defineStore } from 'pinia'
import { AppStore, getAppDefaultSettings } from './helper'
import { useFileStore } from '..'

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
    async notification(
      message: string,
      type?: 'error' | 'success' | 'warning' | 'info'
    ): Promise<void> {
      this.messageQueue.push({ message, type, show: true })

      let permissionGranted = await isPermissionGranted()
      if (!permissionGranted) {
        const permission = await requestPermission()
        permissionGranted = permission === 'granted'
      }
      if (permissionGranted) {
        sendNotification({ title: 'MoYun', body: message })
      }
    },
    /**
     * 更新侧边栏菜单激活项
     */
    updateAsideMenuItem(item: AsideMenuItem) {
      this.asideMenu.itemList.forEach((i) => {
        i.active = i.route === item.route ? true : false
      })
    },
    /**
     * 全局搜索
     */
    globalSearch(key: string) {
      const fileStore = useFileStore()
      console.log('搜索', key)
      if (key) {
        // 记录搜索
        if (this.searchRecord.indexOf(key) === -1) {
          this.searchRecord.push(key)
        }
        // 开始查找
        this.searchResult.length = 0
        fileStore.filter(key).forEach((item) => {
          this.searchResult.push({
            title: '文件',
            subtitle: item.name,
            value: item,
            to: `/personal/file`
          })
        })
      }
    }
  },
  /**
   * 用户存储对象的数据持久化配置
   * @type {Array<{storage:StorageLike ; paths:Array<string>}>} 持久化配置
   */
  persist: [
    {
      storage: localStorage,
      paths: ['asideMenu', 'app', 'searchRecord', 'launchWelcome']
    }
  ]
})
