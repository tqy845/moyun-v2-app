import { MoYunFileChunk } from '@/types/models'
import SparkMD5 from 'spark-md5'

/**
 * 文件分片
 * @description 这个方法会被worker线程调用
 */
export const createChunk = (file: File, index: number, chunkSize: number) => {
  return new Promise<MoYunFileChunk>((resolve) => {
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
 * 根据文件大小计算分片大小
 * @param fileSize 文件大小
 */
export const calculateFileSliceSize = (fileSize: number) => {
  if (fileSize <= 1 * 1024 * 1024 * 1024) {
    return 10 * 1024 * 1024 // 10 MB
  } else if (fileSize <= 5 * 1024 * 1024 * 1024) {
    return 50 * 1024 * 1024 // 50 MB
  } else if (fileSize <= 10 * 1024 * 1024 * 1024) {
    return 100 * 1024 * 1024 // 100 MB
  } else if (fileSize <= 50 * 1024 * 1024 * 1024) {
    return 500 * 1024 * 1024 // 500 MB
  } else {
    // 如果文件大小大于50 TB，则返回默认分片大小
    return 1 * 1024 * 1024 * 1024 // 1 GB，默认分片大小
  }
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
