import { FileChunk } from '@/types/models'
import { fetchRequest, tauriRequest } from '@/utils/request'
import { ResponseType } from '@tauri-apps/api/http'

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
 * @param {string} formData 包含分片的表单
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 * @description 暂时废弃，因为worker线程无法使用该接口，已在worker线程中单独使用fetch
 */
export const uploadFileChunk = <T = any>(formData: FormData, flag: string) => {
  return fetchRequest<T>({
    url: `/system/user/file/chunk`,
    method: 'PUT',
    body: formData,
    key: flag
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

/**
 * 删除文件
 * @param {string} fileName 文件名
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const fileDeleteByName = <T = any>(fileName: string) => {
  return fetchRequest<T>({
    url: `/system/user/file/${fileName}`,
    method: 'DELETE'
  })
}

/**
 * 删除文件<batch>
 * @param {string} fileNameList 文件名列表
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const fileDeleteByNameList = <T = any>(params: { fileNames: Array<string> }) => {
  return tauriRequest<T>({
    url: `/system/user/file/delete-multiple`,
    method: 'DELETE',
    data: params
  })
}

/**
 * 获取下载文件分片列表<single>
 * @param {string} params 包含文件名的对象
 * @param {string} params.fileName 文件名
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const fetchFileChunkNames = <T = any>(params: { fileName: string }) => {
  return fetchRequest<T>({
    url: `/system/user/file/${params.fileName}`,
    method: 'GET'
  })
}

/**
 * 获取下载文件分片<single>
 * @param {string} params 包含文件名的对象
 * @param {string} params.fileName 文件名
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const fetchFileChunk = <T = any>(params: { chunkName: string }) => {
  return fetchRequest<T>({
    url: `/system/user/file/chunk/${params.chunkName}`,
    method: 'GET'
  })
}

/**
 * 下载文件<batch>
 * @param {string} fileNameList 文件名列表
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const fileDownloadByNameList = <T = any>(params: { fileNames: Array<string> }) => {
  return tauriRequest<T>({
    url: `/system/user/file/download-multiple`,
    method: 'GET',
    data: params
  })
}
