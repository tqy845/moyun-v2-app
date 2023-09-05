import App from './App.vue'
import { createApp } from 'vue'

// 设置组件
import { setupRouter } from '@/router'
import { setupVuetify, setupPinia, setupI18n } from '@/plugins'

/**
 * 应用启动引导，用于初始化应用程序和相关插件
 * @function
 */
const bootstrap = async () => {
  const app = createApp(App)

  // 挂载 Pinia 状态管理
  setupPinia(app)

  // 挂载国际化
  setupI18n(app)

  // 挂载 Vuetify
  setupVuetify(app)

  // 挂载路由
  await setupRouter(app)

  // 挂载到根节点
  app.mount('#app')
}

// 启动引导
bootstrap()
