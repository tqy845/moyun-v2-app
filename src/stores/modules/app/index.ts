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
    },
    /**
     * 自定义主题色
     */
    customThemeColor(key: string) {
      const darkTheme: { [key: string]: string } = {
        blankCodeBg: 'bg-grey-darken-3',
        uploadHeaderBar: '#212121',
        uploadArea: '#2A2A2A',
        fileMenu: '#1B1B1B',
        fileAppBar: 'teal-lighten-4',
        uploadProgress: 'text-black',
        uploadProgressBg: '#A3A3A3',
        fileRenameBg: '#1B1B1B'
      }
      const lightTheme: { [key: string]: string } = {
        blankCodeBg: 'bg-grey-lighten-3',
        uploadHeaderBar: '#212121',
        uploadArea: '#F1F1F1',
        fileMenu: 'grey-lighten-3',
        fileAppBar: 'teal-darken-4',
        uploadProgress: 'text-white',
        uploadProgressBg: '',
        fileRenameBg: 'white'
      }
      return this.settings['basic']['colorTheme'] === 'dark' ? darkTheme[key] : lightTheme[key]
    },
    /**
     * 是否为彩色主题图标
     */
    isColoursIcon() {
      return this.settings['basic']['iconColorTheme'] === '1'
    },
    /**
     * 初始化关键选中的菜单项
     */
    initKeySelectedMenuItem() {
      this.app.menuIndex['currentUserCenterMenuTab'] = []
      this.app.menuIndex['currentSecondMenuTab'] = []
    }
  },
  /**
   * 用户存储对象的数据持久化配置
   * @type {Array<{storage:StorageLike ; paths:Array<string>}>} 持久化配置
   */
  persist: [
    {
      storage: localStorage,
      paths: ['asideMenu', 'app', 'searchRecord', 'settings']
    }
  ]
})
