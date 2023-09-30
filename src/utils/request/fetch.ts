import { useUserStore, useAppStore } from '@/stores'
import { useCookies } from '@vueuse/integrations/useCookies'
import { BASE_URL, ResponseType } from './helper'
import { BaseDirectory, writeBinaryFile } from '@tauri-apps/api/fs'

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
  } & RequestInit
): Promise<ResponseType<T>> => {
  try {
    const appStore = useAppStore()
    const userStore = useUserStore()
    const cookies = useCookies(['locale'])
    const { url, key, data, responseType, onProgress, ...args } = options
    let result = {
      code: 200,
      message: 'success',
      data: {} as T
    }

    const controller = new AbortController()
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

    // 处理响应数据
    result = await response.json()

    // 拦截数据
    console.log('Response:', result)

    return result
  } catch (err) {
    console.error(err)
    return {
      code: -1,
      message: 'error',
      data: {} as T
    }
  }
}

export default fetchRequest
