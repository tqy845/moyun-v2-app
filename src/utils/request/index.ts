import axios, { type AxiosRequestConfig, type AxiosResponse, type AxiosInstance } from 'axios'
import type { ResponseType } from '@/utils/request/helper'
import { useAppStore } from '@/stores'
import { useCookies } from '@vueuse/integrations/useCookies'
/**
 * 创建 axios 实例
 */
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_VERSION
})

const cookies = useCookies(['locale'])

/**
 * 发起请求
 * @param config 请求配置
 * @return Promise<ResponseType<T>> 响应数据
 */
const request = async <T = any>(config: AxiosRequestConfig): Promise<ResponseType<T>> => {
  instance.defaults.headers.common['Accept-Language'] = cookies.get('locale')
  try {
    const appStore = useAppStore()
    const { data }: AxiosResponse<ResponseType<T>> = await instance.request(config)
    console.log('Response:', data)
    if (data.code !== 200) {
      appStore.globalMessage(data.message, 'error')
    }
    return data
  } catch (err: any) {
    // todo 错误提示
    console.log(err)
    return Promise.reject({
      code: -1,
      message: err.message,
      data: null
    })
  }
}

export default request
