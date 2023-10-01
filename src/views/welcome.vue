<!--
  welcome
  @author 谭期元
  @date  2023/09/15
  @description “欢迎”页
-->
<script lang="ts" setup>
import { onMounted } from 'vue'
import { useAppStore } from '@/stores'

const appStore = useAppStore()

onMounted(() => {})
</script>

<template>
  <v-parallax height="100%" src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg">
    <v-row justify="center" align="center" class="flex-column h-50 text-black text-center">
      <div class="text-h4 font-weight-thin mb-4">摸云 Safe and sound - Mo yun</div>
      <p class="subheading text-center">欢迎使用，当前最新v2.x Aipha</p>
    </v-row>
    <v-row justify="center" align="center" class="h-25 text-black text-center">
      <v-list lines="two" bg-color="transparent">
        <v-list-item
          title="为什么选择 Moyun"
          subtitle="Moyun 是一个功能强大的网盘工具，基于Rust从底层开始构建。我们的UI在应用程序中保持一致的风格， 并提供足够的自定义选项以满足任何使用情况。"
        ></v-list-item>
        <v-list-item
          title="Rust + Tauri"
          subtitle="使用Rust和Tauri构建快速、安全、可跨平台的桌面应用程序，实现前端与后端分离。"
        ></v-list-item>
        <v-list-item
          title="Vue3 + TypeScript + Sass"
          subtitle="利用Vue 3、TypeScript和Sass创建现代、类型安全、样式可维护的前端Web应用。"
        ></v-list-item>
        <v-list-item
          title="SpringBoot + Redis + Mysql"
          subtitle="结合Spring Boot、Redis和MySQL构建高性能、可扩展的后端应用，实现数据持久化和缓存支持。"
        ></v-list-item>
      </v-list>
      <!-- <v-col cols="12" class="px-3">
        <v-list lines="two" bg-color="transparent">
          <v-list-item
            title="Rust + Tauri"
            subtitle="使用Rust和Tauri构建快速、安全、可跨平台的桌面应用程序，实现前端与后端分离。"
          ></v-list-item>
          <v-list-item
            title="Vue3 + TypeScript + Sass"
            subtitle="利用Vue 3、TypeScript和Sass创建现代、类型安全、样式可维护的前端Web应用。"
          ></v-list-item>
          <v-list-item
            title="SpringBoot + Redis + Mysql"
            subtitle="结合Spring Boot、Redis和MySQL构建高性能、可扩展的后端应用，实现数据持久化和缓存支持。"
          ></v-list-item>
        </v-list>
      </v-col> -->
    </v-row>
  </v-parallax>
</template>

<style lang="scss" scoped></style>
