<!--
  welcome
  @author 谭期元
  @date  2023/09/15
  @description “欢迎”页
-->
<script lang="ts" setup>
import { useAppStore } from '@/stores'
import tauriConfig from '../../src-tauri/tauri.conf.json'

const appStore = useAppStore()
</script>

<!-- src="https://c.wallhere.com/photos/13/67/abstract_fluid_liquid_illustration_graphic_design_artwork_digital_art_green-2094119.jpg!d" -->

<template>
  <v-img class="h-100" :gradient="appStore.customThemeColor('welcomeBg')">
    <v-row
      justify="center"
      align="center"
      class="flex-column text-grey-lighten-4 h-100 text-center ma-0 ma-4 px-16"
    >
      <div
        class="text-h4 font-weight-bold pa-0 ma-0 font-italic"
        style="text-shadow: 1px 1px 1px black"
      >
        {{ tauriConfig['package']['productName'] }} - v.{{ tauriConfig['package']['version'] }}
      </div>
      <v-list
        lines="two"
        bg-color="transparent"
        class="mt-16"
        style="text-shadow: 1px 2px 3px rgb(4, 4, 4)"
      >
        <v-list-item
          title="为什么选择 MoYun ？"
          subtitle="Moyun 是一个功能强大的网盘工具，基于Rust从底层开始构建。我们的UI在应用程序中保持一致的风格， 并提供足够的自定义选项以满足任何使用情况。"
        ></v-list-item>
        <v-list-item
          title="Rust + Tauri"
          subtitle="使用Rust和Tauri构建快速、安全、跨平台的桌面应用程序，实现前端与后端分离。"
        ></v-list-item>
        <v-list-item
          title="Vue3 + TypeScript + Sass"
          subtitle="利用Vue 3、TypeScript和Sass创建现代、类型安全、样式可维护的前端应用。"
        ></v-list-item>
        <v-list-item
          title="SpringBoot + Redis + Mysql"
          subtitle="结合Spring Boot、Redis和MySQL构建高性能、可扩展的后端应用，实现数据持久化和缓存支持。"
        ></v-list-item>
        <v-list-item
          title="HTTP2"
          subtitle="此外，我们选择了使用HTTP2协议，它是一种二进制协议，旨在为HTTP提供低延迟和高吞吐量。HTTP2协议的性能比HTTP1.1协议快quite a bit，并且它还支持多路复用、服务器推送、请求优先级、压缩和加密。"
        ></v-list-item>
        <v-list-item
          title="MinIo"
          subtitle="最终用于存储大量数据、文件和媒体使用的是MinIo，MinIo作为一种对象存储解决方案，是一个开源的对象存储服务器，MinIo的优势包括开源、S3兼容、高性能、可扩展、数据安全、纠删编码、高可用性、易用性、积极社区支持、数据生命周期管理以及经济实惠。"
        ></v-list-item>
        <v-list-item>
          <template #title>
            <v-checkbox
              style="display: inline-block"
              label="登录后显示欢迎页"
              v-model="appStore['settings']['basic']['launchWelcome']"
            ></v-checkbox>
          </template>
        </v-list-item>
      </v-list>
    </v-row>
  </v-img>
</template>

<style lang="scss" scoped></style>
