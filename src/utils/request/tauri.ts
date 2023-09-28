import { Body, FetchOptions, Response, fetch } from '@tauri-apps/api/http'
import { BASE_URL, type ResponseType } from '@/utils/request/helper'
import { useAppStore, useUserStore } from '@/stores'
import { useCookies } from '@vueuse/integrations/useCookies'

/**
 * 操作cookies
 */
const cookies = useCookies(['locale'])

/**
 * Fetch
 * @param options 请求配置
 */
const tauriRequest = async <T = any>(
  options: { url: string; data?: Object; form?: { [key: string]: any } } & FetchOptions
): Promise<ResponseType<T>> => {
  const appStore = useAppStore()
  const userStore = useUserStore()
  const { url, data, form, ...args } = options
  let result: ResponseType<T> = {
    code: 200,
    message: 'success',
    data: {} as T
  }

  /**
   * Header：I18n、Token
   */
  args.headers = {
    'Accept-Language': cookies.get('locale')
  }
  if (userStore.token) {
    args.headers.Authorization = `Bearer ${userStore.token}`
  }
  /**
   * 拼接请求参数
   */
  if (data) {
    args.body = Body.json(data)
  }

  console.log('Request', args)

  /**
   * Request
   */
  const response: Response<ResponseType<T>> = await fetch(BASE_URL + url, args)

  /**
   * Stream
   */
  if (response.headers['content-type'] === 'application/octet-stream') {
    const blob = new Blob([response.data as unknown as BlobPart])
    // 返回Blob数据
    console.log(123123123)

    result.data = { blob } as T
  } else {
    result = response.data
  }

  /**
   * Response
   */
  console.log('Response:', result.data, response)

  if (result.code !== 200) {
    appStore.notification(result.message, 'error')
  }

  return result
}

export default tauriRequest
