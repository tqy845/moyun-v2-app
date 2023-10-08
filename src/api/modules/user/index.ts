import { User } from '@/stores'
import { tauriRequest, fetchRequest } from '@/utils/request'

/**
 * 获取验证码
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const fetchCodeImage = <T = any>() => {
  return fetchRequest<T>({
    url: `/captchaImage`,
    method: 'GET'
  })
}

/**
 * 注册账户
 * @param {string} params.email - 邮箱
 * @param {string} params.password - 密码
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const registerByAccount = <T = any>(params: { email: string; password: string }) => {
  return fetchRequest<T>({
    url: `/registerByEmail`,
    method: 'POST',
    data: params
  })
}

/**
 * 使用账户登录
 * @param {User} param - 用户对象
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const loginByAccount = <T = any>(user: User) => {
  return fetchRequest<T>({
    url: '/login',
    method: 'POST',
    data: user
  })
}

/**
 * 退出登录
 * @param param - 用户对象
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const logoutForUser = <T = any>(user: User) => {
  return fetchRequest<T>({
    url: '/system/user/logout',
    method: 'DELETE',
    data: user
  })
}

/**
 * 生物认证
 * @param options - 包含各种选项的参数对象
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const registeredTouch = <T = any>(options: { [key: string]: any }) => {
  return fetchRequest<T>({
    url: '/touch',
    method: 'POST',
    data: options
  })
}

/**
 * 是否在线
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const isLogin = <T = any>() => {
  return fetchRequest<T>({
    url: '/system/user',
    method: 'GET'
  })
}
