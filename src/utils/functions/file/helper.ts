/**
 * 获取文件分片
 */
export const getChuanks = (file: File) => {
  // 实现文件分片
  const chunkSize = 1024 * 1024 * 10 // 单个分片大小
  const totalChunks = Math.ceil(file.size / chunkSize) // 总分片数量
  let currentChunk = 0

  const worker = new Worker(new URL('./worker.js', import.meta.url))

  worker.postMessage({
    totalChunks,
    fileName: file.name
  })
  worker.onmessage = (e) => {
    if (currentChunk < totalChunks) {
      const data = e.data

      const start = currentChunk * chunkSize
      const end = Math.min(start + chunkSize, file.size)
      const chunk = file.slice(start, end)
      worker.postMessage({
        chunk,
        chunkNumber: currentChunk
      })
      currentChunk++
      const progress = (currentChunk / totalChunks) * 100
    } else {
      console.log('文件上传完成...')
      worker.terminate()
    }
  }
}
