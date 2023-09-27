import { createChunk, uploadChunk } from './helper'
self.onmessage = async (event) => {
  const { file, CHUNK_ITEM_SIZE, startIndex, endIndex } = event.data
  const proms = []
  for (let i = startIndex; i < endIndex; i++) {
    // 切片
    // proms.push(createChunk(file, i, CHUNK_ITEM_SIZE))
    const chunk = await createChunk(file, i, CHUNK_ITEM_SIZE)
    uploadChunk(chunk)
  }
  // const chunks = await Promise.all(proms)
  // postMessage(chunk)
}
