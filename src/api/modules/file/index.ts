import {fetchRequest, tauriRequest} from '@/utils/request'

/**
 * 文件列表
 * @returns 返回一个 Promise，Promise 解析后的值的类型是泛型类型 T
 */
export const fileListFetch = <T = any>(params: { path: string }) => {
    return fetchRequest<T>({
        url: `/system/user/file/list`,
        method: 'POST',
        data: params
    })
}

/**
 * 上传文件（分片）
 * @param {string} formData 包含分片的表单
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
    return fetchRequest<T>({
        url: `/system/user/file/delete-multiple`,
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
