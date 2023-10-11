/**
 * User Store
 */

import {defineStore} from 'pinia'
import {getUserDefaultSettings, UserStore} from './helper'
import {fetchCodeImage, isLogin, loginByAccount, logoutForUser, personalInfo, registerByAccount} from '@/api'
import {cryptUtils} from '@/utils/functions'
import {useAppStore, useFileStore} from '@/stores'
import {UserProperties} from "@/types/models/user.ts";

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
                data: {img, uuid}
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
         * @param {UserProperties} userProperties- 包含邮箱和密码的用户属性
         */
        async userLoginByAccount(userProperties: UserProperties) {
            const appStore = useAppStore()
            const fileStore = useFileStore()

            appStore.$reset()
            // const _user = { ...user, password: encrypt(user.password) }
            const _userProperties = userProperties
            const {code, data} = await loginByAccount<{ token: string }>(_userProperties)

            if (code === 200) {
                this.user.email = _userProperties.username!
                this.user.username = _userProperties.username
                this.token = data['token']
                // 加载文件列表
                fileStore.fetch()
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
            const {code} = await isLogin()
            return code === 200
        },
        /**
         * 获取个人信息
         */
        async info() {
            const {data} = await personalInfo<{
                user: Array<{ [key: string]: any; permissions: Array<string>; roles: Array<string> }>
            }>()
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
