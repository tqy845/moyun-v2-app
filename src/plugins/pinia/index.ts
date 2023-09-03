import { createPinia } from 'pinia'
import type { App } from 'vue'

// Create instance of pinia
const pinia = createPinia()
// 持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Setup Component
export const setupPinia = (app: App) => {
  pinia.use(piniaPluginPersistedstate)

  app.use(pinia)
}
