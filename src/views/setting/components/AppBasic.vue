<!--
  AppBasic
  @author 谭期元
  @date  2023/10/23
  @description “通用配置”组件
-->
<script lang="ts" setup>
import { useAppStore } from '@/stores'

const appStore = useAppStore()
</script>

<template>
  <v-card flat>
    <v-card-item>
      <v-checkbox
        v-model="appStore['settings']['basic']['launchWelcome']"
        label="登录后显示欢迎页"
      ></v-checkbox>
    </v-card-item>
    <v-card-item>
      <v-checkbox
        v-model="appStore['settings']['basic']['powerOn']"
        label="开机自动启动（推荐）"
      ></v-checkbox>
    </v-card-item>
    <v-card-item>
      <v-checkbox
        v-model="appStore['settings']['basic']['autoUpdate']"
        label="自动升级"
      ></v-checkbox>
    </v-card-item>
  </v-card>
</template>

<style lang="scss" scoped></style>
