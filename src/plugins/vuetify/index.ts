/**
 * Vuetify
 */
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import { createVuetify } from 'vuetify'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'
import { i18n } from '@/plugins/i18n'
import { useI18n } from 'vue-i18n'
import type { App } from 'vue'

// Create instance of vuetify component
const vuetify = createVuetify({
  // Vuetify Icons
  icons: {
    defaultSet: 'mdi'
  },
  // Vuetify I18n
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n })
  }
  // Vuetify Components
  // components,
  // // Vuetify Directives
  // directives,
})

/**
 * Setup Component
 * @param app App实例
 */
export const setupVuetify = (app: App) => {
  app.use(vuetify)
}
