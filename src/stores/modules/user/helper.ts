import {UserProperties} from "@/types/models/user.ts";
/**
 * 用户存储对象接口
 * @interface UserStore
 */
export interface UserStore {
    /**
     * 用户信息
     * @type {User}
     */
    user: UserProperties

    /**
     * 用户令牌（可选）
     * @type {string | null}
     */
    token: string | null
}

/**
 * 获取用户默认设置
 * @function
 * @returns {UserStore} 包含用户信息和令牌的用户存储对象
 */
export const getUserDefaultSettings = (): UserStore => {
    return {
        user: {
            username: '',
            password: '',
            email: ''
        },
        token: null
    }
}
