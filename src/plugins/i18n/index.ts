import type {App} from 'vue'

import en from '@/locales/en.json'
import zhHans from '@/locales/zh-hans.json'
import jp from '@/locales/jp.json'
import vi from '@/locales/vi.json'

import {createI18n} from 'vue-i18n'
import {useCookies} from '@vueuse/integrations/useCookies'

const cookies = useCookies(['locale'])

// I18n instance configuration
export const i18n = createI18n({
    legacy: false, // 要把 legacy 设为 false，才可以使用 Composition API
    locale: cookies.get('locale'),
    fallbackLocale: 'zhHans',
    globalInjection: true, //全局生效$t
    messages: {
        zhHans,
        en,
        jp,
        vi
    }
})

// Setup i18n globally
export const setupI18n = (app: App) => {
    app.use(i18n)
}
