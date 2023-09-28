<!--
  AppHeaderBar
  @author 谭期元
  @date  2023/09/15
  @description “上边菜单栏”组件
-->
<script lang="ts" setup>
import { AppLanguage, AppFileView, AppFileSearch, AppFileUpload } from '@/components/common'

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

// const toUploadPage = () => {
//   router.push('/upload')
// }
</script>

<template>
  <v-app-bar color="teal-darken-4">
    <template v-slot:image>
      <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
    </template>

    <!-- 更多操作 -->
    <!-- <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template> -->

    <!-- 面包屑 -->
    <v-app-bar-title>
      <v-breadcrumbs v-bind="$attrs"></v-breadcrumbs>
    </v-app-bar-title>

    <!-- 右侧分栏 -->
    <v-spacer></v-spacer>

    <!-- 文件搜索 -->
    <AppFileSearch />

    <!-- 文件上传 -->
    <AppFileUpload />
    <!-- <v-btn icon @click="toUploadPage"> <v-icon>mdi-cloud-upload</v-icon> </v-btn> -->

    <!-- 视图切换 -->
    <AppFileView />

    <!-- I18n 语言切换 -->
    <AppLanguage />
  </v-app-bar>
</template>

<style lang="scss" scoped></style>
