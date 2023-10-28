<!--
  DefaultLayout
  @author 谭期元
  @date  2023/07/26
  @description “默认”布局
-->
<script lang="ts" setup>
import { reactive } from 'vue'
import { AppSidebar, AppUserCard } from './components'
import { AppSystemBar } from '../components'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { AppFilePreview, App401, AppLanguageReload } from '@/components/common'

const router = useRouter()
const userStore = useUserStore()

const cs = reactive({
  asideMenu: {
    show: true
  }
})

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
    <!-- 系统栏 -->
    <AppSystemBar />

    <v-navigation-drawer
      :rail="cs.asideMenu.show"
      class="border-none"
      color="grey-lighten-4"
      permanent
    >
      <v-sheet
        class="d-flex flex-column bg-surface-variant h-100"
        v-click-outside="handleClickOutside"
      >
        <!-- 个人信息 -->
        <v-sheet class="">
          <AppUserCard :status="cs.asideMenu.show" />
        </v-sheet>

        <!-- 菜单 -->
        <v-sheet class="flex-1 h-100" @click="cs.asideMenu.show = !cs.asideMenu.show">
          <!-- 侧边栏 -->
          <AppSidebar />
        </v-sheet>
      </v-sheet>
    </v-navigation-drawer>

    <RouterView name="aside" />

    <v-main>
      <!-- 头部菜单栏 -->
      <RouterView name="header" />

      <!-- 文件预览 -->
      <AppFilePreview />

      <!-- 语言切换提示 -->
      <AppLanguageReload />

      <!-- 401认证失败提示 -->
      <App401 />

      <!-- 内容区域 -->
      <RouterView />
    </v-main>
  </v-app>
</template>

<style lang="less" scoped></style>
