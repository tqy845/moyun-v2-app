import { FileChunk } from '@/types/models'
import SparkMD5 from 'spark-md5'
import { fileChunkUpload } from '@/api'

/**
 * 文件分片
 */
export const createChunk = (file: File, index: number, chunkSize: number) => {
  return new Promise<FileChunk>((resolve) => {
    const start = index * chunkSize
    const end = start + chunkSize
    const spark = new SparkMD5.ArrayBuffer()
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      spark.append(e.target?.result as ArrayBuffer)
      resolve({
        start,
        end,
        index,
        hash: spark.end()
      })
    }
    fileReader.readAsArrayBuffer(file.slice(start, end))
  })
}

export const uploadChunk = (chunk: FileChunk) => {
  console.log('chunk = ', chunk)

  fileChunkUpload(chunk)
}

// export const createAndUploadChunk = () => {
//   // 实现文件分片

//   let currentChunk = 0

//   const worker = new Worker(new URL('./worker.ts', import.meta.url), {
//     type: 'module'
//   })

//   worker.postMessage({
//     totalChunks,
//     fileName: file.name
//   })
//   worker.onmessage = (e) => {
//     if (currentChunk < totalChunks) {
//       const data = e.data
//       console.log('Data = ', data)

//       const start = currentChunk * chunkSize
//       const end = Math.min(start + chunkSize, file.size)
//       const chunk = file.slice(start, end)

//       currentChunk++
//       const progress = (currentChunk / totalChunks) * 100
//       worker.postMessage({
//         chunk,
//         chunkNumber: currentChunk,
//         progress
//       })
//     } else {
//       console.log('文件上传完成...', chunkSize, totalChunks, currentChunk)
//       worker.terminate()
//     }
//   }
// }
