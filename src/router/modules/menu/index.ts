/**
 * File Routes
 */
import type { RouteRecordRaw } from 'vue-router'
import { DefaultLayout, DefaultMenu, DefaultBlank } from '@/layout'
import { File, Welcome, TrashCan, SynchroDisk } from '@/views'

// Route rule definition
export const routeMenu: Readonly<RouteRecordRaw[]> = [
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
  {
    path: '/personal',
    components: {
      default: DefaultLayout
    },
    children: [
      {
        path: '',
        components: {
          aside: DefaultMenu,
          default: DefaultBlank
        }
      },
      {
        path: 'file',
        components: {
          aside: DefaultMenu,
          default: File
        }
      },
      {
        path: 'trash-can',
        components: {
          aside: DefaultMenu,
          default: TrashCan
        }
      },

      {
        path: 'synchro-disk',
        components: {
          aside: DefaultMenu,
          default: SynchroDisk
        }
      }
    ]
  },
  {
    path: '/school',
    components: {
      default: DefaultLayout
    },
    children: [
      {
        path: '',
        components: {
          aside: DefaultMenu,
          default: DefaultBlank
        }
      },
      {
        path: 'file',
        components: {
          aside: DefaultMenu,
          default: File
        }
      }
    ]
  }
]
