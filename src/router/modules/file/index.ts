/**
 * File Routes
 */
import type { RouteRecordRaw } from 'vue-router'
import { DefaultLayout, DefaultMenu } from '@/layout'
import { File } from '@/views'

// Route rule definition
export const routeFile: Readonly<RouteRecordRaw[]> = [
  {
    path: '/file',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: File
      }
    ]
  }
]
