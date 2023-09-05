/**
 * 用户信息接口
 * @interface User
 */
export interface User {
  /**
   * 用户邮箱
   * @type {string}
   */
  email: string

  /**
   * 用户密码
   * @type {string}
   */
  password: string

  /**
   * 用户名（可选）
   * @type {string | undefined}
   */
  username?: string

  /**
   * 验证码（可选）
   * @type {string | undefined}
   */
  code?: string

  /**
   * 用户唯一标识（可选）
   * @type {string | undefined}
   */
  uuid?: string
}

/**
 * 用户存储对象接口
 * @interface UserStore
 */
export interface UserStore {
  /**
   * 用户信息
   * @type {User}
   */
  user: User

  /**
   * 用户令牌（可选）
   * @type {string | undefined}
   */
  token?: string
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
    }
  }
}
