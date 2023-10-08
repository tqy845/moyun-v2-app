/**
 * User Store
 */

import { defineStore } from 'pinia'
import { getUserDefaultSettings, User, UserStore } from './helper'
import { fetchCodeImage, isLogin, loginByAccount, logoutForUser, registerByAccount } from '@/api'
import { cryptUtils } from '@/utils/functions'
import { useAppStore, useFileStore } from '@/stores'

export const useUserStore = defineStore('userStore', {
  state: (): UserStore => getUserDefaultSettings(),
  getters: {},
  actions: {
    /**
     * 验证码
     */
    async codeImage() {
      const {
        code,
        data: { img, uuid }
      } = await fetchCodeImage<{
        img: string
        uuid: string
        code: string
        captchaEnabled: boolean
      }>()

      if (code === 200) {
        this.user.uuid = uuid
        return `data:image/gif;base64,${img}`
      }
      return ''
    },

    /**
     * 使用账户信息注册用户
     * @param {User} user - 包含邮箱和密码的用户对象
     */
    async registerByAccount(user: User) {
      return await registerByAccount<{ token?: string }>({
        email: user.email,
        password: cryptUtils.encrypt(user.password)
      })
    },

    /**
     * 使用账户信息进行用户登录
     * @param {User} user - 包含邮箱和密码的用户对象
     */
    async userLoginByAccount(user: User) {
      const appStore = useAppStore()
      const fileStore = useFileStore()

      appStore.$reset()
      // const _user = { ...user, password: encrypt(user.password) }
      const _user = user
      const { code, data } = await loginByAccount<{ token: string }>(_user)

      if (code === 200) {
        this.user.email = _user.username!
        this.user.username = _user.username
        this.token = data['token']
        // 加载文件列表
        fileStore.fetch()
        return true
      }
    },

    /**
     * 使用触摸登录用户（未实现）
     * @param {User} user - 用户对象
     */
    async userLoginByTouch(user: User) {
      return false
    },

    /**
     * 登出
     */
    async logout(callback?: Function) {
      this.$reset()
      logoutForUser(this.user)
      // 执行回调
      if (callback) {
        callback()
      }
    },
    /**
     * 是否已经登录
     */
    async isLogin(): Promise<boolean> {
      const { code } = await isLogin()
      return code === 200
    }
  },

  /**
   * 用户存储对象的数据持久化配置
   * @type {Array<{storage:StorageLike ; paths:Array<string>}>} 持久化配置
   */
  persist: [
    {
      storage: localStorage,
      paths: ['user', 'token']
    }
  ]
})
