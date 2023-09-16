/**
 * Profile Routes
 */
import type { RouteRecordRaw } from 'vue-router'
import { DefaultLayout, LoginLayout } from '@/layout'
import { Login, Register, Profile } from '@/views'

// Route rule definition
export const routeProfile: Readonly<RouteRecordRaw[]> = [
  {
    path: '/login',
    component: LoginLayout,
    children: [
      {
        path: '',
        component: Login
      },
      {
        path: '/signup',
        component: Register
      }
    ]
  },
  {
    path: '/profile',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: Profile
      }
    ]
  }
]
