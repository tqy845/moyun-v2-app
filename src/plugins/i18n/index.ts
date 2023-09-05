import type { App } from 'vue'

import en from '@/locales/en.json'
import zhHans from '@/locales/zh-hans.json'
import jp from '@/locales/jp.json'
import vi from '@/locales/vi.json'

import { createI18n } from 'vue-i18n'
import { useCookies } from '@vueuse/integrations/useCookies'

/**
 * 使用 VueUse 的 useCookies() hook，用于获取和设置语言选择的 Cookie
 */
const cookies = useCookies(['locale'])

/**
 * 创建 i18n 实例并配置
 */
export const i18n = createI18n({
  legacy: false, // 要把 legacy 设为 false，才可以使用 Composition API
  locale: cookies.get('locale'), // 从 Cookie 中获取当前语言设置
  fallbackLocale: 'zhHans', // 默认的回退语言设置
  globalInjection: true, // 全局生效$t
  messages: {
    zhHans, // 简体中文语言包
    en, // 英语语言包
    jp, // 日语语言包
    vi // 越南语语言包
  }
})

/**
 * 挂载 i18n 实例
 * @function
 * @param {App} app - Vue 3 应用程序实例
 */
export const setupI18n = (app: App) => {
  app.use(i18n)
}
