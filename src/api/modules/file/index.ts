import { FileChunk } from '@/types/models'
import { fetchRequest, tauriRequest } from '@/utils/request'

/**
 * 文件列表
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const fetchFileList = <T = any>() => {
  return fetchRequest<T>({
    url: `/system/user/file/list`,
    method: 'GET'
  })
}

/**
 * 上传文件（分片）
 * @param {string} fileName 文件名
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const uploadFileChunk = <T = any>(chunk: FileChunk) => {
  return tauriRequest<T>({
    url: `/system/user/file/chunk`,
    method: 'POST',
    data: chunk
  })
}

/**
 * 下载文件
 * @param {string} fileName 文件名
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const fileDownloadByName = <T = any>(fileName: string, downloadProgress: Function) => {
  return fetchRequest<T>({
    url: `/system/user/file/${fileName}`,
    method: 'GET',
    responseType: 'blob',
    onProgress: (progress) => {
      downloadProgress(progress)
    }
  })
}
