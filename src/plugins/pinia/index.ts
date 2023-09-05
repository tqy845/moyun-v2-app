import { createPinia } from 'pinia'
import type { App } from 'vue'

// 创建 Pinia 实例
const pinia = createPinia()

// 引入持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

/**
 * 挂载 Pinia 插件和实例
 * @function
 * @param {App} app - Vue 3 应用程序实例
 */
export const setupPinia = (app: App) => {
  // 使用 Pinia 插件来启用持久化状态
  pinia.use(piniaPluginPersistedstate)

  // 在应用程序中使用 Pinia 实例
  app.use(pinia)
}
