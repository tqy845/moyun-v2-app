/**
 * App Global Configuration
 */

import App from './App.vue'
import { createApp } from 'vue'

// Setup components
import { setupRouter } from '@/router'
import { setupVuetify, setupPinia, setupI18n } from '@/plugins'
import { invoke } from '@tauri-apps/api'

/**
 * Bootstrap
 */
const bootstrap = async () => {
  const app = createApp(App)

  setupPinia(app)
  setupI18n(app)
  setupVuetify(app)
  await setupRouter(app)

  invoke('greet', { name: 'Moyun' })
    // `invoke` 返回异步函数
    .then((response) => console.log(response))

  app.mount('#app')
}

bootstrap()
