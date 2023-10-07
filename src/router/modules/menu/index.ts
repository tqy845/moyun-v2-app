/**
 * File Routes
 */
import type { RouteRecordRaw } from 'vue-router'
import { DefaultLayout, Menu, Blank, Header } from '@/layout'
import { File, Welcome, TrashCan, SynchroDisk, Setting, RightMenuWindow } from '@/views'
import { RightMenuLayout } from '@/layout/right-menu-layout'

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
          header: Header,
          default: Blank
        }
      },
      {
        path: 'file',
        components: {
          aside: Menu,
          header: Header,
          default: File
        }
      },
      {
        path: 'trash-can',
        components: {
          aside: Menu,
          header: Header,
          default: TrashCan
        }
      },

      {
        path: 'synchro-disk',
        components: {
          aside: Menu,
          header: Header,
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
  },
  {
    path: '/right-menu',
    components: {
      default: RightMenuLayout
    },
    children: [
      {
        path: '',
        component: RightMenuWindow
      }
    ]
  }
]
