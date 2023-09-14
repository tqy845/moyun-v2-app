import request from '@/utils/request'

/**
 * 下载文件
 * @param {string} fileName 文件名
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const fileDownloadByName = <T = any>(fileName: String) => {
  return request<T>({
    url: `/system/user/file/${fileName}`,
    method: 'get',
    responseType: 'blob' // 指定响应数据类型为二进制数据
  })
}
