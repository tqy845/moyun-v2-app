import { useAppStore, useUserStore } from '@/stores'
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
  } & RequestInit
): Promise<ResponseType<T>> => {
  try {
    const appStore = useAppStore()
    const userStore = useUserStore()
    const cookies = useCookies(['locale'])
    const { url, responseType, onProgress, ...args } = options
    let result = {
      code: 200,
      message: 'success',
      data: {} as T
    }

    // 构建请求头
    const headers: HeadersInit = {
      'Accept-Language': cookies.get('locale'),
      ResponseType: responseType || 'json'
    }

    if (userStore.token) {
      headers['Authorization'] = `Bearer ${userStore.token}`
    }

    // 合并请求配置
    const requestInit: RequestInit = {
      ...args,
      headers
    }

    // 发起请求
    const response = await fetch(BASE_URL + url, requestInit)

    // 处理文件流
    if (onProgress && response.body) {
      const contentDisposition = response.headers.get('content-disposition')
      const matches =
        (contentDisposition && contentDisposition.match(/filename="(.+)"/)) || '未知文件'
      const reader = response.body.getReader()
      const contentLength = Number(response.headers.get('content-length'))
      let receivedLength = 0
      const chunks: Uint8Array[] = []
      requestAnimationFrame(() => onProgress(0))
      while (reader) {
        const { done, value } = await reader.read()
        if (done) {
          break
        }
        receivedLength += value.length
        chunks.push(value)
        // 使用requestAnimationFrame调度下一次更新
        requestAnimationFrame(() => {
          // 计算并调用进度回调
          onProgress((receivedLength / contentLength) * 100)
        })
      }
      const chunksAll = new Uint8Array(receivedLength)
      let position = 0
      for (const chunk of chunks) {
        chunksAll.set(chunk, position)
        position += chunk.length
      }

      await writeBinaryFile(matches[1], chunksAll, {
        dir: BaseDirectory.AppData
      })
      appStore.notification(`文件：${matches[1]} 已保存到 ${BaseDirectory.AppData}`, 'success')
    } else {
      // 处理其他响应数据
      result = await response.json()
    }

    // 拦截数据
    console.log('Response:', result)

    if (result.code !== 200) {
      appStore.notification(result.message, 'error')
    }

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
