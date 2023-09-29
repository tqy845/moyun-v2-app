/**
 * File Routes
 */
import type { RouteRecordRaw } from 'vue-router'
import { DefaultLayout, Menu, Blank } from '@/layout'
import { File, Welcome, TrashCan, SynchroDisk, Setting } from '@/views'

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
          aside: Menu,
          default: Blank
        }
      },
      {
        path: 'file',
        components: {
          aside: Menu,
          default: File
        }
      },
      {
        path: 'trash-can',
        components: {
          aside: Menu,
          default: TrashCan
        }
      },

      {
        path: 'synchro-disk',
        components: {
          aside: Menu,
          default: SynchroDisk
        }
      }
    ]
  },
  {
    path: '/setting',
    components: {
      default: DefaultLayout
    },
    children: [
      {
        path: '',
        components: {
          aside: Menu,
          default: Setting
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
          aside: Menu,
          default: Blank
        }
      },
      {
        path: 'file',
        components: {
          aside: Menu,
          default: File
        }
      }
    ]
  }
]
