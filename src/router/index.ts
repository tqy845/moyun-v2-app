/**
 * Router Component
 */

import {
  createRouter,
  createWebHistory,
  NavigationGuard,
  NavigationGuardNext,
  RouteLocationNormalized,
  type RouteRecordRaw
} from 'vue-router'
import { routeProfile, routeMenu } from './modules'
import { Home } from '@/views'
import type { App } from 'vue'
import { useUserStore } from '@/stores'

/**
 * 路由配置
 */
const constantRoutes: readonly RouteRecordRaw[] = [
  /**
   * 启动页
   */
  {
    path: '',
    redirect: '/login',
    component: Home,
    children: []
  },
  ...routeMenu,
  ...routeProfile
]

/**
 * 创建路由实例
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

/**
 * 挂载路由实例
 * @param app App 实例
 */
export const setupRouter = async (app: App) => {
  app.use(router)
  await router.isReady()
}

/**
 * 路由拦截器
 * @param to 到哪里去
 * @param from 从哪里来
 * @param next 是否放行
 */
const checkAuth: NavigationGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  /**
   * 检查用户是否已登录
   */
  if (to.matched.some((record) => record.meta.requiresAuth !== false)) {
    const userStore = useUserStore()
    if (await userStore.isLogin()) {
      // 如果用户已登录，继续导航
      next()
    } else {
      // 如果用户未登录，重定向到登录页面
      next('/login')
    }
  } else {
    // 如果路由不需要登录，直接继续导航
    next()
  }
}

/**
 * 在路由前执行拦截器
 */
router.beforeEach(checkAuth)
