import { FileChunk } from '@/types/models'
import SparkMD5 from 'spark-md5'

/**
 * 文件分片
 * @description 这个方法会被worker线程调用
 */
export const createChunk = (
  file: File,
  index: number,
  chunkSize: number,
) => {
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
