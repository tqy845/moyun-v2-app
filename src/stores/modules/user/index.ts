import { defineStore } from 'pinia'
import { getUserDefaultSettings, type User, type UserStore } from './helper'
import { fetchCodeImage, loginByAccount, logoutForUser, registerByAccount } from '@/api'
import { encrypt } from '@/utils/functions'

export const useUserStore = defineStore('userStore', {
  state: (): UserStore => getUserDefaultSettings(),
  getters: {},
  actions: {
    /**
     *  获取验证码
     * @returns base64的验证码图片
     */
    async getCodeImage() {
      const {
        code,
        data: { img, uuid }
      } = await fetchCodeImage()
      if (code === 200) {
        this.uuid = uuid
        return `data:image/gif;base64,${img}`
      }
      return ''
    },
    /**
     * 注册账户
     */
    async registerByAccount(user: User) {
      const _user = Object.assign({}, user)
      return await registerByAccount({ email: _user.email, password: encrypt(_user.password) })
    },
    /**
     * 用户使用账号密码登录
     * @param user 用户对象
     * @returns 登录结果
     */
    async userLoginByAccount(user: User) {
      const _user: User & { uuid: string } = Object.assign({}, user, {
        uuid: this.uuid || ''
      })

      const { code, data } = await loginByAccount(_user)

      if (code === 200) {
        this.token = data?.token
        return true
      }
      return false
    },
    /**
     * 用户通过Touch登录
     * @param user 用户对象
     * @returns 登录结果
     */
    async userLoginByTouch(user: User) {
      return false
    },
    /**
     * 注销登录
     */
    async logout() {
      logoutForUser(this.user)
      this.$reset()
    }
  },
  persist: [
    {
      storage: localStorage,
      paths: ['user']
    }
  ]
})
