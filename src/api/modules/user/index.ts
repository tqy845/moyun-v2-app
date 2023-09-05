/**
 * User API
 */
import request from '@/utils/request'
import { type User } from '@/stores'

/**
 * 获取验证码
 * @returns
 */
export const fetchCodeImage = <T = any>() => {
  return request<T>({
    url: '/captchaImage',
    method: 'get'
  })
}

/**
 * 注册账户
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
 * @param param
 * @returns
 */
export const logoutForUser = <T = any>(param: User) => {
  return request<T>({
    url: '/system/user/logout',
    method: 'delete',
    data: param
  })
}

/**
 * touch 生物认证
 * @param options
 * @return { check : boolean } true 或者 false
 */
export const registeredTouch = <T = any>(options: { [key: string]: any }) => {
  return request<T>({
    url: '/touch',
    method: 'post',
    data: options
  })
}
