<!--
  DefaultLayout
  @author 谭期元
  @date  2023/07/26
  @description “默认”布局
-->
<script lang="ts" setup>
import { reactive } from 'vue'
import { AppHeaderBar, AppSidebar } from './components'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

const router = useRouter()
const userStore = useUserStore()

const cs = reactive({
  asideMenu: {
    show: true
  }
})

const user = reactive({
  initials: '谭',
  fullName: '谭期元',
  username: '卡的淋漓尽致',
  email: 'tqy845@outlook.com'
})

/**
 * 前往个人中心
 */
const handleProfile = () => {
  console.log('profile')
  userStore.logout()
  router.replace('/login')
}

/**
 * 点击外部缩放侧边栏
 */
const handleClickOutside = () => {
  // console.log('缩放侧边栏')
  cs.asideMenu.show = true
}
</script>

<template>
  <v-app>
    <v-navigation-drawer
      :rail="cs.asideMenu.show"
      class="border-none"
      color="grey-lighten-4"
      permanent
    >
      <v-sheet
        class="d-flex flex-column bg-surface-variant h-screen"
        v-click-outside="handleClickOutside"
      >
        <v-sheet class="">
          <v-list>
            <v-list-item @click="handleProfile" :subtitle="user?.email" :title="user?.username">
              <template #prepend>
                <v-avatar color="surface-variant">{{ user.initials }}</v-avatar>
              </template>
            </v-list-item>
          </v-list>
        </v-sheet>

        <v-sheet class="flex-1 h-100" @click="cs.asideMenu.show = !cs.asideMenu.show">
          <!-- 侧边栏 -->
          <AppSidebar />
        </v-sheet>
      </v-sheet>
      <!-- 主菜单 -->
    </v-navigation-drawer>

    <RouterView name="aside" />

    <v-main>
      <!-- 头部菜单栏 -->
      <AppHeaderBar />

      <!-- 内容区域 -->
      <RouterView />
    </v-main>
  </v-app>
</template>

<style lang="less" scoped></style>
