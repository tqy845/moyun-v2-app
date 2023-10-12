import { BasicFile } from '@/types/models'
import { fetchRequest, tauriRequest } from '@/utils/request'

/**
 * 文件列表
 * @param {Object} params 传递对象
 * @param {string} params.path 文件夹路径
 * @param {boolean} params.isDeleted 是否已经删除的文件
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const fileListFetch = <T = any>(params: { path: string; isDeleted: boolean }) => {
  return fetchRequest<T>({
    url: `/system/user/file/list`,
    method: 'POST',
    data: params
  })
}

/**
 * 上传文件（分片）
 * @param {string} formData 包含分片的表单
 * @param {string} flag 网络请求标识
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 * @description 暂时废弃，因为worker线程无法使用该接口，已在worker线程中单独使用fetch
 */
export const fileChunkUpload = <T = any>(formData: FormData, flag: string) => {
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
 * @param {number} startByte 开始字节，从0开始
 * @param {number} endByte 结束字节
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const fileDownloadByName = <T = any>(
  fileName: string,
  startByte: number,
  endByte: number,
  downloadProgress: Function
) => {
  return fetchRequest<T>({
    url: `/system/user/file/${fileName}/download`,
    fileName,
    method: 'GET',
    responseType: 'blob',
    headers: {
      Range: `bytes=${startByte}-${endByte}`
    },
    onProgress: (progress) => {
      downloadProgress(progress)
    }
  })
}

/**
 * 删除文件<single>
 * @param {string} fileName 文件名
 * @description 软删除
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
 * @param {Object} params 传递对象
 * @param {Array<string>} params.fileNames 文件名列表
 * @description 软删除
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const fileDeleteByNameList = <T = any>(params: { fileNames: Array<string> }) => {
  return fetchRequest<T>({
    url: `/system/user/file/delete-multiple`,
    method: 'DELETE',
    data: params
  })
}

/**
 * 移除文件<batch>
 * @param {Object} params 传递对象
 * @param {Array<string>} params.fileNames 文件名列表
 * @description 硬删除
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const fileRemoveByNameList = <T = any>(params: { fileNames: Array<string> }) => {
  return fetchRequest<T>({
    url: `/system/user/file/remove/multiple`,
    method: 'DELETE',
    data: params
  })
}

/**
 * 下载文件<batch>
 * @param {string} fileNameList 文件名列表
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const fileDownloadByNameList = <T = any>(params: { fileNames: Array<string> }) => {
  return fetchRequest<T>({
    url: `/system/user/file/download-multiple`,
    method: 'GET',
    data: params
  })
}

/**
 * 还原已经删除的文件<single>
 * @param {Object} params 传递对象
 * @param {string} params.fileName 文件名
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const fileRestoreByFileName = <T = any>(params: { fileName: string }) => {
  return fetchRequest<T>({
    url: `/system/user/file/restore`,
    method: 'PUT',
    data: params
  })
}

/**
 * 还原所有已经删除的文件<all>
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const fileRestoreAll = <T = any>() => {
  return fetchRequest<T>({
    url: `/system/user/file/restore/all`,
    method: 'PUT'
  })
}
