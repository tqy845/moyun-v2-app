import { UploadChunk, FileChunk } from '@/types/models'
import SparkMD5 from 'spark-md5'
import { useAppStore, useFileStore } from '@/stores'

const MAX_CHUNKS_SMALL_FILE = 1 // 针对小文件的最大分片数
const MAX_CHUNKS_MEDIUM_FILE = 50 // 针对中等文件的最大分片数
const MAX_CHUNKS_LARGE_FILE = 100 // 针对大文件的最大分片数

const CHUNK_SIZE = 1024 * 1024 * 10 // 单个分片大小
const THREAD_COUNT = navigator.hardwareConcurrency || 4

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

export const determineMaxChunks = (fileSize: number) => {
  if (fileSize < 1 * 1024 * 1024) {
    return MAX_CHUNKS_SMALL_FILE
  } else if (fileSize < 5 * 1024 * 1024 * 1024) {
    return MAX_CHUNKS_MEDIUM_FILE
  } else {
    return MAX_CHUNKS_LARGE_FILE
  }
}
