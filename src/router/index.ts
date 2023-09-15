/**
 * Router Component
 */

// @ts-nocheck
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { DefaultLayout } from '@/layout'
import { routesHome } from './modules'
import { Home, Welcome } from '@/views'
import type { App } from 'vue'

// Route rule definition

const constantRoutes: readonly RouteRecordRaw[] = [
  {
    path: '',
    redirect: '/login',
    component: Home
  },

  {
    path: '/welcome',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: Welcome
      }
    ]
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
 * 挂载路由实例
 * @param app App 实例
 */
export const setupRouter = async (app: App) => {
  app.use(router)
  await router.isReady()
}
