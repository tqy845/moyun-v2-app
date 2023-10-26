/**
 * Vuetify
 */
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // 确保你使用了 css-loader

import { createVuetify } from 'vuetify'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { i18n } from '@/plugins/i18n'
import { useI18n } from 'vue-i18n'
import type { App } from 'vue'
import { VDataTable, VDataTableVirtual } from 'vuetify/labs/VDataTable'
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'

// 创建 Vuetify 组件实例
const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#212121'
        }
      },
      dark: {
        colors: {
          primary: '#E0E0E0'
        }
      }
    }
  },
  // Vuetify Icons
  icons: {
    defaultSet: 'mdi'
  },
  // Vuetify I18n
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n })
  },
  // Vuetify Components
  components: {
    VDataTable,
    VDataTableVirtual,
    VSkeletonLoader
  }
  // components,
  // // Vuetify Directives
  // directives,
})

/**
 * 挂载 Vuetify 组件
 * @function
 * @param {App} app - Vue 3 应用程序实例
 */
export const setupVuetify = (app: App) => {
  app.use(vuetify)
}

/**
 * 切换主题
 */
export const switchTheme = (newTheme: 'dark' | 'light') => {
  vuetify.theme.global.name.value = newTheme
}
