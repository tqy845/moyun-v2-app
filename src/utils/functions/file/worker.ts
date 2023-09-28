import { createChunk } from './helper'

// 多线程切片
self.onmessage = async (event) => {
  const { file, startIndex, endIndex, CHUNK_SIZE } = event.data
  for (let i = startIndex; i < endIndex; i++) {
    // 切片
    const chunk = await createChunk(file, i, CHUNK_SIZE)
    // 返回切片数据
    self.postMessage(chunk)
  }
}
