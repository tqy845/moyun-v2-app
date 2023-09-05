import { defineStore } from 'pinia'
import { getUserDefaultSettings, User, UserStore } from './helper'
import { fetchCodeImage, loginByAccount, logoutForUser, registerByAccount } from '@/api'
import { encrypt } from '@/utils/functions'

export const useUserStore = defineStore('userStore', {
  state: (): UserStore => getUserDefaultSettings(),
  getters: {},
  actions: {
    /**
     * 获取验证码图片
     */
    async getCodeImage() {
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
        password: encrypt(user.password)
      })
    },

    /**
     * 使用账户信息进行用户登录
     * @param {User} user - 包含邮箱和密码的用户对象
     */
    async userLoginByAccount(user: User) {
      Object.assign(user, { password: encrypt(user.password) })
      const { code, data } = await loginByAccount<{ token?: string }>(user)

      if (code === 200) {
        this.token = data?.token
        return true
      }
      return false
    },

    /**
     * 使用触摸登录用户（未实现）
     * @param {User} user - 用户对象
     */
    async userLoginByTouch(user: User) {
      return false
    },

    /**
     * 用户注销操作
     */
    async logout() {
      logoutForUser(this.user)
      this.$reset()
    }
  },

  /**
   * 用户存储对象的数据持久化配置
   * @type {Array<{storage:StorageLike ; paths:Array<string>}>} 持久化配置
   */
  persist: [
    {
      storage: localStorage,
      paths: ['user']
    }
  ]
})
