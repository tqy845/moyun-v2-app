import { ACTION_TYPE } from '@/types/enums'

/**
 * 请求的 AbortController
 */
const controllers: { [key: string]: any } = {}

/**
 * 多线程下载
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
  const { requestId, chunkName, url, token } = event.data

  // 上传
  const response = await sendRequest(requestId, url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  // 响应结果
  const { code } = await response.json()

  self.postMessage(code === 200)
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
