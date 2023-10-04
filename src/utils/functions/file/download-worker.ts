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
   * 发起请求
   */
  const sendRequest = async (url: string, options: RequestInit) => {
    const controller = new AbortController()
    //   controllers[requestId] = controller
    return await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      ...options,
      signal: controller.signal
    })
  }

  /**
   * 获取文件分片名称列表
   */
  const getChunkNames = async (fileName: string, params: { url: string }) => {
    const response = await sendRequest(`${params['url']}/${fileName}`, { method: 'GET' })
    const {
      data: { chunkNames }
    } = await response.json()

    return chunkNames
  }

  /**
   * 获取文件分片
   * @param 分片名
   */
  const getChunk = async (chunkName: string, params: { url: string }) => {
    // 处理文件流
    const response = await sendRequest(`${params['url']}/${chunkName}`, { method: 'GET' })

    if (
      response.headers.get('content-type')?.includes('application/octet-stream') &&
      response.body
    ) {
      const reader = response.body.getReader()
      // 创建一个新的Uint8Array来存储合并的数据
      const chunks: Uint8Array[] = [] // Array to store chunks

      const flag = true
      while (flag) {
        const { done, value } = await reader.read()
        if (done) {
          break
        }
        chunks.push(value)
      }

      // 将所有块合并到Uint8Array中
      const mergedArray = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0))
      let offset = 0
      for (const chunk of chunks) {
        mergedArray.set(chunk, offset)
        offset += chunk.length
      }

      return mergedArray
    }
  }

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
  const { fileName, token, chunkNamesRequest, chunkNameRequest } = event.data

  const chunkNames = await getChunkNames(fileName, chunkNamesRequest)

  for (const index in chunkNames) {
    const chunkName = chunkNames[index]
    self.postMessage({
      chunk: await getChunk(chunkName, chunkNameRequest),
      chunkName,
      chunkIndex: Number(index) + 1,
      chunkNames
    })
  }
}
