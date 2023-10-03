import { ACTION_TYPE } from '@/types/enums'
import { createChunk } from './helper'

/**
 * 请求的 AbortController
 */
const controllers: { [key: string]: any } = {}

/**
 * 多线程切片
 * @param event 主线程发来的数据
 */
self.onmessage = async (event) => {
  /**
   * 取消网络请求
   */
  if (event.data.type === 'cancel') {
    for (const requestId in controllers) {
      if (Object.hasOwn(controllers, requestId)) {
        controllers[requestId].abort()
      }
    }
    self.postMessage(ACTION_TYPE.CANCEL)
  }

  /**
   * 发起网络请求
   */
  const { startIndex, endIndex, CHUNK_SIZE, index, requestId, url, token, file } = event.data
  const flagList: Array<number> = []

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
    const response = await sendRequest(requestId, url, {
      method: 'PUT',
      body: form,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    // 响应结果
    const { code } = await response.json()
    // 返回
    flagList.push(code)
  }

  self.postMessage(flagList.every((item) => item === 200))
}

/**
 * 发起请求
 * @param requestId 请求ID
 * @param url 地址
 * @param options 选项
 */
const sendRequest = async (requestId: string, url: string, options: RequestInit) => {
  const controller = new AbortController()
  controllers[requestId] = controller
  return await fetch(url, { ...options, signal: controller.signal })
}
