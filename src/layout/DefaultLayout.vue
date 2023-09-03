<!--
  DefaultLayout
  @author 谭期元
  @date  2023/07/26
  @description “默认”布局
-->
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { TheMainMenu, TheSearch, TheSecondaryMenu } from '@/components/common'

const asideMenuShow = ref(true)
</script>

<template>
  <v-app>
    <v-navigation-drawer
      :rail="asideMenuShow"
      class="border-none"
      color="grey-lighten-4"
      permanent
      @click="asideMenuShow = !asideMenuShow"
    >
      <!-- 主菜单 -->
      <TheMainMenu />
    </v-navigation-drawer>

    <v-navigation-drawer color="grey-lighten-5" nav permanent width="248">
      <!-- 文件搜索 -->
      <TheSearch />

      <!-- 二级菜单-->
      <TheSecondaryMenu />
    </v-navigation-drawer>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style lang="less" scoped></style>