import { useCookies } from '@vueuse/integrations/useCookies'

/**
 * 存储在 Cookie 中的令牌键名
 */
const TOKEN_KEY = 'MOYUN_TOKEN'

/**
 * 使用 VueUse 的 useCookies() hook
 */
const cookie = useCookies()

/**
 * 获取存储在 Cookie 中的令牌值
 * @function
 * @returns {string | null} 令牌值，如果不存在则返回 null
 */
export const getToken = (): string | null => {
  return cookie.get(TOKEN_KEY)
}

/**
 * 将令牌值存储到 Cookie 中
 * @function
 * @param {string} token - 要存储的令牌值
 */
export const setToken = (token: string) => {
  return cookie.set(TOKEN_KEY, token)
}

/**
 * 从 Cookie 中移除存储的令牌值
 * @function
 */
export const removeToken = () => {
  return cookie.remove(TOKEN_KEY)
}
