import { UserStore } from './../../stores/modules/user/helper'
import axios, { type AxiosRequestConfig, type AxiosResponse, type AxiosInstance } from 'axios'
import type { ResponseType } from '@/utils/request/helper'
import { useAppStore, useUserStore } from '@/stores'
import { useCookies } from '@vueuse/integrations/useCookies'
/**
 * 创建 axios 实例
 */
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_VERSION
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
const request = async <T = any>(config: AxiosRequestConfig): Promise<ResponseType<T> | null> => {
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
      // 创建一个Blob对象并下载文件
      const blob = new Blob([response.data])
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'downloaded-file.ext' // 指定下载的文件名
      a.click()
      window.URL.revokeObjectURL(url)

      return null // 返回null表示无需处理响应数据
    }

    // 处理其他响应数据
    const data: ResponseType<T> = response.data

    // 拦截数据
    console.log('Response:', data)

    if (data.code !== 200) {
      appStore.globalMessage(data.message, 'error')
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

export default request
