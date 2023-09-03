/**
 * Response Type
 */

export interface ResponseType<T> {
  message: string
  code: number
  data: T
}

export const ERROR_TYPE = {
  ERR_BAD_REQUEST: '非法请求'
}
