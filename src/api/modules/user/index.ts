import { User } from '@/stores';
import request from '@/utils/request'

/**
 * 获取验证码
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const fetchCodeImage = <T = any>() => {
  return request<T>({
    url: '/captchaImage',
    method: 'get'
  })
}

/**
 * 注册账户
 * @param {string} params.email - 邮箱
 * @param {string} params.password - 密码
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const registerByAccount = <T = any>(params: { email: string; password: string }) => {
  return request<T>({
    url: '/registerByEmail',
    method: 'post',
    data: params
  })
}

/**
 * 使用账户登录
 * @param {User} param - 用户对象
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const loginByAccount = <T = any>(param: User) => {
  return request<T>({
    url: '/login',
    method: 'post',
    data: param
  })
}

/**
 * 退出登录
 * @param param - 用户对象
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const logoutForUser = <T = any>(param: User) => {
  return request<T>({
    url: '/system/user/logout',
    method: 'delete',
    data: param
  })
}

/**
 * 生物认证
 * @param options - 包含各种选项的参数对象
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const registeredTouch = <T = any>(options: { [key: string]: any }) => {
  return request<T>({
    url: '/touch',
    method: 'post',
    data: options
  })
}
