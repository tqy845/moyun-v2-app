import { createChunk } from './helper'

// 多线程切片
self.onmessage = async (event) => {
  const { startIndex, endIndex, CHUNK_SIZE, index, token, file } = event.data

  for (let i = startIndex; i < endIndex; i++) {
    // 切片
    const object: { [key: string]: any } = {
      fileName: file.name,
      ...(await createChunk(file, i, CHUNK_SIZE))
    }
    const { chunk, ...args } = object

    // 构建表单上传
    const form = new FormData()
    form.append('file', chunk, `chunk_${index}`)
    form.append('chunkSize', String(CHUNK_SIZE))
    for (const key in args) {
      if (Object.hasOwn(args, key)) {
        const element = args[key]
        form.append(key, element)
      }
    }

    // 上传
    const response = await fetch('http://localhost/system/user/file/chunk', {
      method: 'PUT',
      body: form,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    // 响应结果
    const { code, message } = await response.json()
    // console.log('result = ', message)
    // 返回
    self.postMessage(code === 200)
  }
}
