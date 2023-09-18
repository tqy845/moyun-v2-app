// vite.config.ts
import { defineConfig, loadEnv } from "file:///C:/Users/64466/Documents/Workspace/moyun-pc-sofware/node_modules/.pnpm/vite@4.4.4_@types+node@18.16.17_sass@1.64.2/node_modules/vite/dist/node/index.js";
import { fileURLToPath, URL } from "node:url";
import vue from "file:///C:/Users/64466/Documents/Workspace/moyun-pc-sofware/node_modules/.pnpm/@vitejs+plugin-vue@4.2.3_vite@4.4.4_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vuetify from "file:///C:/Users/64466/Documents/Workspace/moyun-pc-sofware/node_modules/.pnpm/vite-plugin-vuetify@1.0.2_vite@4.4.4_vue@3.3.4_vuetify@3.3.9/node_modules/vite-plugin-vuetify/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/64466/Documents/Workspace/moyun-pc-sofware/vite.config.ts";
var vite_config_default = async ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [vue(), vuetify()],
    resolve: {
      alias: {
        find: "vue-i18n",
        replacement: "vue-i18n/dist/vue-i18n.cjs.js",
        //解决i8n警告
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    },
    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
      host: env["VITE_APP_HOST "],
      port: parseInt(env["VITE_APP_PORT"], 10),
      strictPort: true
      // proxy: {
      //   '/api/v1': {
      //     target: env['VITE_APP_API_ENDPOINT'], //代理的地址
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace('/api/v1', '')
      //   }
      // }
    },
    // 3. to make use of `TAURI_DEBUG` and other env variables
    // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
    envPrefix: ["VITE_", "TAURI_"]
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw2NDQ2NlxcXFxEb2N1bWVudHNcXFxcV29ya3NwYWNlXFxcXG1veXVuLXBjLXNvZndhcmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDY0NDY2XFxcXERvY3VtZW50c1xcXFxXb3Jrc3BhY2VcXFxcbW95dW4tcGMtc29md2FyZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvNjQ0NjYvRG9jdW1lbnRzL1dvcmtzcGFjZS9tb3l1bi1wYy1zb2Z3YXJlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgdnVldGlmeSBmcm9tICd2aXRlLXBsdWdpbi12dWV0aWZ5J1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHsgbW9kZSB9KSA9PiB7XHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKVxyXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xyXG4gICAgcGx1Z2luczogW3Z1ZSgpLCB2dWV0aWZ5KCldLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgIGZpbmQ6ICd2dWUtaTE4bicsXHJcbiAgICAgICAgcmVwbGFjZW1lbnQ6ICd2dWUtaTE4bi9kaXN0L3Z1ZS1pMThuLmNqcy5qcycsIC8vXHU4OUUzXHU1MUIzaThuXHU4QjY2XHU1NDRBXHJcbiAgICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIFZpdGUgb3B0aW9ucyB0YWlsb3JlZCBmb3IgVGF1cmkgZGV2ZWxvcG1lbnQgYW5kIG9ubHkgYXBwbGllZCBpbiBgdGF1cmkgZGV2YCBvciBgdGF1cmkgYnVpbGRgXHJcbiAgICAvL1xyXG4gICAgLy8gMS4gcHJldmVudCB2aXRlIGZyb20gb2JzY3VyaW5nIHJ1c3QgZXJyb3JzXHJcbiAgICBjbGVhclNjcmVlbjogZmFsc2UsXHJcbiAgICAvLyAyLiB0YXVyaSBleHBlY3RzIGEgZml4ZWQgcG9ydCwgZmFpbCBpZiB0aGF0IHBvcnQgaXMgbm90IGF2YWlsYWJsZVxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIGhvc3Q6IGVudlsnVklURV9BUFBfSE9TVCAnXSxcclxuICAgICAgcG9ydDogcGFyc2VJbnQoZW52WydWSVRFX0FQUF9QT1JUJ10sIDEwKSxcclxuICAgICAgc3RyaWN0UG9ydDogdHJ1ZVxyXG4gICAgICAvLyBwcm94eToge1xyXG4gICAgICAvLyAgICcvYXBpL3YxJzoge1xyXG4gICAgICAvLyAgICAgdGFyZ2V0OiBlbnZbJ1ZJVEVfQVBQX0FQSV9FTkRQT0lOVCddLCAvL1x1NEVFM1x1NzQwNlx1NzY4NFx1NTczMFx1NTc0MFxyXG4gICAgICAvLyAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAvLyAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgnL2FwaS92MScsICcnKVxyXG4gICAgICAvLyAgIH1cclxuICAgICAgLy8gfVxyXG4gICAgfSxcclxuICAgIC8vIDMuIHRvIG1ha2UgdXNlIG9mIGBUQVVSSV9ERUJVR2AgYW5kIG90aGVyIGVudiB2YXJpYWJsZXNcclxuICAgIC8vIGh0dHBzOi8vdGF1cmkuc3R1ZGlvL3YxL2FwaS9jb25maWcjYnVpbGRjb25maWcuYmVmb3JlZGV2Y29tbWFuZFxyXG4gICAgZW52UHJlZml4OiBbJ1ZJVEVfJywgJ1RBVVJJXyddXHJcbiAgfSlcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVWLFNBQVMsY0FBYyxlQUFlO0FBQzdYLFNBQVMsZUFBZSxXQUFXO0FBQ25DLE9BQU8sU0FBUztBQUNoQixPQUFPLGFBQWE7QUFIcU0sSUFBTSwyQ0FBMkM7QUFNMVEsSUFBTyxzQkFBUSxPQUFPLEVBQUUsS0FBSyxNQUFNO0FBQ2pDLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFDdkMsU0FBTyxhQUFhO0FBQUEsSUFDbEIsU0FBUyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7QUFBQSxJQUMxQixTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUE7QUFBQSxRQUNiLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsTUFDdEQ7QUFBQSxJQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFJQSxhQUFhO0FBQUE7QUFBQSxJQUViLFFBQVE7QUFBQSxNQUNOLE1BQU0sSUFBSSxnQkFBZ0I7QUFBQSxNQUMxQixNQUFNLFNBQVMsSUFBSSxlQUFlLEdBQUcsRUFBRTtBQUFBLE1BQ3ZDLFlBQVk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBUWQ7QUFBQTtBQUFBO0FBQUEsSUFHQSxXQUFXLENBQUMsU0FBUyxRQUFRO0FBQUEsRUFDL0IsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogW10KfQo=
