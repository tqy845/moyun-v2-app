<!--
  AppHeaderBar
  @author 谭期元
  @date  2023/09/15
  @description “上边菜单栏”组件
-->
<script lang="ts" setup>
import { AppFileView, AppFileSearch, AppFileSort } from '@/components/common'
import { AppFileClassTabs, AppFileMiniUploadProgress } from './components'
import { useAppStore } from '@/stores'

const appStore = useAppStore()
</script>

<template>
  <v-app-bar :color="appStore.customThemeColor()['fileAppBar']">
    <template v-slot:image>
      <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
    </template>

    <!-- 文件分类菜单 -->
    <AppFileClassTabs />

    <!-- 右侧分栏 -->
    <v-spacer></v-spacer>

    <!-- 文件搜索 -->
    <AppFileSearch />

    <!-- 文件上传和环形进度条 -->
    <AppFileMiniUploadProgress />

    <!-- 视图切换 -->
    <AppFileView />

    <!-- 文件排序 -->
    <AppFileSort />
  </v-app-bar>
</template>

<style lang="scss" scoped></style>
