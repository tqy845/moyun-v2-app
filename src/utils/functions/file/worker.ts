import { createChunk } from './helper'

// 多线程切片
self.onmessage = async (event) => {
  const { file, startIndex, endIndex, totalChunkCount, CHUNK_SIZE } = event.data
  for (let i = startIndex; i < endIndex; i++) {
    // 切片
    const object = {
      fileName: file.name,
      totalChunkCount,
      ...(await createChunk(file, i, CHUNK_SIZE))
    }

    // 返回
    self.postMessage(object)
  }
}
