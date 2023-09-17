import axios, { type AxiosRequestConfig, type AxiosResponse, type AxiosInstance } from 'axios'
import { BASE_URL, type ResponseType } from '@/utils/request/helper'
import { useAppStore, useUserStore } from '@/stores'
import { useCookies } from '@vueuse/integrations/useCookies'

/**
 * 创建 axios 实例
 */
const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL
})

/**
 * 操作cookies
 */
const cookies = useCookies(['locale'])

/**
 * 发起请求
 * @param config 请求配置
 * @return Promise<ResponseType<T>> 响应数据
 */
const axiosRequest = async <T = any>(config: AxiosRequestConfig): Promise<ResponseType<T>> => {
  try {
    const appStore = useAppStore()
    const userStore = useUserStore()

    // 配置 I18n
    instance.defaults.headers.common['Accept-Language'] = cookies.get('locale')
    // 配置 Auth
    if (userStore.token) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${userStore.token}`
    }

    // 发起请求
    const response: AxiosResponse = await instance.request(config)
    // 处理文件流
    if (response.headers['content-type'] === 'application/octet-stream') {
      const blob = new Blob([response.data])
      return {
        code: 200,
        message: 'success',
        data: {
          blob
        } as T
      }
    }

    // 处理其他响应数据
    const data: ResponseType<T> = response.data

    // 拦截数据
    console.log('Response:', data)

    if (data.code !== 200) {
      appStore.notification(data.message, 'error')
    }
    return data
  } catch (err: any) {
    console.error(err)
    return {
      code: -1,
      message: err.message,
      data: {} as T
    }
  }
}

export default axiosRequest
