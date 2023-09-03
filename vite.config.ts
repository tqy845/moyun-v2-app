import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default async ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [vue(), vuetify()],
    resolve: {
      alias: {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js', //解决i8n警告
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
      host: env['VITE_APP_HOST '],
      port: parseInt(env['VITE_APP_PORT'], 10),
      strictPort: true,
      proxy: {
        '/api/v1': {
          target: env['VITE_APP_API_ENDPOINT'], //代理的地址
          changeOrigin: true,
          rewrite: (path) => path.replace('/api/v1', '')
        }
      }
    },
    // 3. to make use of `TAURI_DEBUG` and other env variables
    // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
    envPrefix: ['VITE_', 'TAURI_']
  })
}
