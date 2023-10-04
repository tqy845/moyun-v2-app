import { FileChunk } from '@/types/models'
import SparkMD5 from 'spark-md5'

/**
 * 文件分片
 * @description 这个方法会被worker线程调用
 */
export const createChunk = (file: File, index: number, chunkSize: number) => {
  return new Promise<FileChunk>((resolve) => {
    const start = index * chunkSize
    const end = start + chunkSize
    const spark = new SparkMD5.ArrayBuffer()
    const fileReader = new FileReader()
    const chunk = file.slice(start, end)

    fileReader.onload = (e) => {
      spark.append(e.target?.result as ArrayBuffer)
      resolve({
        start,
        end,
        index,
        hash: spark.end(),
        chunk
      })
    }

    fileReader.readAsArrayBuffer(chunk)
  })
}

/**
 * 最大分片限制
 * @param fileSize 文件大小
 */
export const calculateFileSlices = (fileSize: number) => {
  if (fileSize <= 300 * 1024 * 1024) {
    return 1
  } else if (fileSize <= 3 * 1024 * 1024 * 1024) {
    return Math.ceil(fileSize / (600 * 1024 * 1024))
  } else if (fileSize <= 6 * 1024 * 1024 * 1024) {
    return Math.ceil(fileSize / (800 * 1024 * 1024))
  } else if (fileSize <= 20 * 1024 * 1024 * 1024) {
    return Math.ceil(fileSize / (1 * 1024 * 1024 * 1024))
  } else if (fileSize <= 50 * 1024 * 1024 * 1024) {
    return Math.min(50, Math.ceil(fileSize / (1 * 1024 * 1024 * 1024)))
  } else if (fileSize <= 2000 * 1024 * 1024 * 1024) {
    return Math.min(100, Math.ceil(fileSize / (10 * 1024 * 1024 * 1024)))
  }
  return 100
}

/**
 * 合并Uint8Arrays
 */
export const mergeUint8Arrays = (...arrays: Uint8Array[]): Uint8Array => {
  let totalLength = 0
  for (const array of arrays) {
    totalLength += array.length
  }

  const mergedArray = new Uint8Array(totalLength)
  let offset = 0
  for (const array of arrays) {
    mergedArray.set(array, offset)
    offset += array.length
  }

  return mergedArray
}
