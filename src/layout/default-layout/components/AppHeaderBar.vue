<!--
  AppHeaderBar
  @author 谭期元
  @date  2023/09/15
  @description “上边菜单栏”组件
-->
<script lang="ts" setup>
import { AppLanguage } from '@/components/common'
import AppFileView from '@/components/common/AppFileView.vue'

const props = defineProps({
  breadcrumbItems: {
    type: Array<{
      title: String
      disabled: Boolean
      href: String
    }>,
    default: () => []
  }
})
</script>

<template>
  <v-app-bar color="teal-darken-4">
    <template v-slot:image>
      <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
    </template>

    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>
      <v-breadcrumbs v-bind="$attrs"></v-breadcrumbs>
    </v-app-bar-title>

    <!-- 右侧分栏 -->
    <v-spacer></v-spacer>

    <!-- 搜索 -->
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <!-- 视图切换 -->
    <AppFileView />

    <!-- I18n 语言切换 -->
    <AppLanguage />
  </v-app-bar>
</template>

<style lang="scss" scoped></style>
