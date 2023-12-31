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
  } else if (form) {
    args.headers['Content-Type'] = 'multipart/form-data'
    args.body = Body.form(form)
  }

  console.log('Request', args)

  /**
   * Request
   */
  try {
    const response: Response<ResponseType<T>> = await fetch(BASE_URL + url, args)

    result = response.data

    /**
     * Response
     */
    console.log('Response:', result.data, response)

    return result
  } catch (error) {
    result = {
      code: 500,
      message: error as string,
      data: {} as T
    }
    return result
  }
}

export default tauriRequest
