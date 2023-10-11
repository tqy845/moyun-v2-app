/**
 * User Store
 */

import { defineStore } from 'pinia'
import { getUserDefaultSettings, UserStore } from './helper'
import {
  fetchCodeImage,
  userIsLogin,
  userInfoFetch,
  loginByAccount,
  logoutForUser,
  registerByAccount
} from '@/api'
import { cryptUtils } from '@/utils/functions'
import { useAppStore, useFileStore } from '@/stores'
import { User, UserProperties } from '@/types/models/user.ts'

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
        this.uuid = uuid
        return `data:image/gif;base64,${img}`
      }
      return ''
    },

    /**
     * 使用账户信息注册用户
     * @param {UserProperties} userProperties - 包含邮箱和密码的用户对象
     */
    async registerByAccount(userProperties: UserProperties) {
      return await registerByAccount<{ token?: string }>({
        email: userProperties.email,
        password: cryptUtils.encrypt(userProperties.password)
      })
    },

    /**
     * 使用账户信息进行用户登录
     * @param {UserProperties} userProperties - 包含邮箱和密码的用户属性
     */
    async userLoginByAccount(userProperties: UserProperties) {
      const appStore = useAppStore()
      const fileStore = useFileStore()

      appStore.$reset()
      // const _user = { ...user, password: encrypt(user.password) }
      const _userProperties = userProperties
      const { code, data } = await loginByAccount<{ token: string }>(_userProperties)

      if (code === 200) {
        // 设置token
        this.token = data['token']
        this.user.email = _userProperties.email
        // 获取个人信息
        // 加载文件列表
        await Promise.all([this.info(), fileStore.fetch()])
        return true
      }
    },

    /**
     * 使用触摸登录用户（未实现）
     * @param {UserProperties} userProperties - 用户属性
     */
    async userLoginByTouch(userProperties: UserProperties) {
      return false
    },

    /**
     * 登出
     */
    async logout(callback?: Function) {
      this.$reset()
      logoutForUser(this.user!)
      // 执行回调
      if (callback) {
        callback()
      }
    },
    /**
     * 是否已经登录
     */
    async isLogin(): Promise<boolean> {
      const { code } = await userIsLogin()
      return code === 200
    },
    /**
     * 获取个人信息
     */
    async info() {
      const { data } = await userInfoFetch<{ user: User }>()
      this.user = { ...this.user, ...data.user }
      console.log('this.user = ', this.user)
      return data
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
