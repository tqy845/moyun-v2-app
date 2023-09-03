/**
 * User API
 */
import request from '@/utils/request'
import { type User } from '@/stores'

export const fetchCodeImage = () => {
  return request<{ img: string; uuid: string; code: string; captchaEnabled: boolean }>({
    url: '/captchaImage',
    method: 'get'
  })
}

export const loginForUserByAccount = (param: User) => {
  return request<{ token?: string }>({
    url: '/login',
    method: 'post',
    data: param
  })
}

export const logoutForUser = (param: User) => {
  return request({
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
