import { useUserStore, useAppStore } from '@/stores'
import { useCookies } from '@vueuse/integrations/useCookies'
import { BASE_URL, ResponseType } from './helper'

const controllerMap: { [key: string]: AbortController } = {}

/**
 * 发起请求
 * @param url 请求的URL
 * @param config 请求配置
 * @return Promise<any> 响应数据
 */
const fetchRequest = async <T = any>(
  options: {
    url: string
    responseType?: 'arraybuffer' | 'blob' | 'json'
    onProgress?: (progress: number) => void
    data?: any
    key?: string
    fileName?: string
  } & RequestInit
): Promise<ResponseType<T>> => {
  // 生成一个唯一的请求标识
  const requestId = Math.random().toString(36).substring(7)
  // abort信号
  const controller = new AbortController()
  controllerMap[requestId] = controller

  try {
    const appStore = useAppStore()
    const userStore = useUserStore()
    const cookies = useCookies(['locale'])
    const { url, key, fileName, data, responseType, onProgress, ...args } = options
    let result = {
      code: 200,
      message: 'success',
      data: {} as T
    }

    if (key) {
      if (!appStore.requestQueue[key] || !Array.isArray(appStore.requestQueue[key])) {
        throw new Error('request aborted')
      } else {
        appStore.requestQueue[key].push(controller)
      }
    }

    // 构建请求头
    const defaultHeaders: HeadersInit = {
      'Accept-Language': cookies.get('locale'),
      'Content-Type': 'application/json',
      ResponseType: responseType || 'json'
    }

    if (userStore.token) {
      defaultHeaders['Authorization'] = `Bearer ${userStore.token}`
    }

    // 合并请求配置
    const requestHeaders = {
      ...defaultHeaders,
      ...options.headers // 合并传入的 headers
    }

    const requestInit: RequestInit = {
      ...args,
      signal: controller.signal,
      headers: requestHeaders // 使用合并后的 headers
    }

    // console.log(requestInit)

    // 发送JSON数据
    if (data) {
      requestInit.body = JSON.stringify(data)
    }

    // 发起请求
    const response = await fetch(BASE_URL + url, requestInit)

    // 处理文件流
    if (
      response.headers.get('content-type')?.includes('application/octet-stream') &&
      response.body
    ) {
      const totalBytes = Number(response.headers.get('Content-Length'))
      let receivedBytes = 0
      const reader = response.body.getReader()
      const chunks = []
      const flag = true
      while (flag) {
        const { done, value } = await reader.read()
        if (done) {
          break
        }
        receivedBytes += value.length
        chunks.push(value)
        if (onProgress && totalBytes) {
          const progress = (receivedBytes / totalBytes) * 100
          onProgress(progress)
        }
      }
      const downloadUrl = window.URL.createObjectURL(new Blob(chunks))
      const link = document.createElement('a')
      link.href = downloadUrl
      link.target = '_blank'
      link.download = fileName ?? '未知文件'
      link.click()
      window.URL.revokeObjectURL(downloadUrl)

      result.data = {
        blob: new Blob(chunks)
      } as T
      return result
    } else {
      // 处理响应数据
      result = await response.json()
      // 拦截数据
      console.log('Response:', result)

      // 针对401认证失败进行处理

      if (result.code === 401) {
        // const router = useRouter()
        // userStore.logout(() => {
        //   router.replace('/login')
        // })
        for (const key of Object.keys(controllerMap)) {
          // 无权限，故取消所有网络请求
          controllerMap[key].abort()
        }
      }

      return result
    }
  } catch (err) {
    console.error(err)
    return {
      code: -1,
      message: 'error',
      data: {} as T
    }
  } finally {
    delete controllerMap[requestId]
    // console.log('controllerMap = ', controllerMap)
  }
}

export default fetchRequest
