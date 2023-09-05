/**
 * Response Type
 */

/**
 * 通用响应类型，用于表示服务器响应数据的结构
 * @interface ResponseType
 * @template T - 数据的类型参数
 */
export interface ResponseType<T> {
  /**
   * 消息
   * @type {string}
   */
  message: string

  /**
   * 响应状态码
   * @type {number}
   */
  code: number

  /**
   * 响应数据
   * @type {T}
   */
  data: T

  /**
   * 响应状态
   * @type {number}
   */
  status: number
}

/**
 * 常见错误类型常量
 * @enum {string}
 */
export const ERROR_TYPE = {
  /**
   * 非法请求错误
   */
  ERR_BAD_REQUEST: '非法请求'
}
