/**
 * Router Component
 */

// @ts-nocheck
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { Home } from '@/views'
import type { App } from 'vue'

import { routesHome } from './modules'

// Route rule definition

const constantRoutes: readonly RouteRecordRaw[] = [
  {
    path: '',
    redirect: '/login',
    component: Home
  },
  ...routesHome
]

// Create Instance of Router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

// Setup Component
/**
 * 注册路由实例
 * @param app App 实例
 */
export const setupRouter = async (app: App) => {
  app.use(router)
  await router.isReady()
}
