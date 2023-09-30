<!--
  AppSystemBar
  @author 谭期元
  @date  2023/09/29
  @description “系统栏”组件
-->

<script lang="ts" setup>
import { reactive } from 'vue'
import { appWindow } from '@tauri-apps/api/window'

const cs = reactive({
  isMax: false
})

/**
 * 最小化
 */
const handleMinimize = () => {
  appWindow.minimize()
}

/**
 * 最大化
 */
const handleMaximize = () => {
  if (cs.isMax) {
    appWindow.unmaximize()
  } else {
    appWindow.maximize()
  }
  cs.isMax = !cs.isMax
}

/**
 * 关闭
 */
const handleClose = () => {
  appWindow.close()
}
</script>

<template>
  <v-system-bar window data-tauri-drag-region color="primary">
    <!-- <v-icon icon="mdi-message" class="me-2"></v-icon> -->
    <!-- <span>10条未读</span> -->

    <v-spacer></v-spacer>

    <v-btn icon="mdi-minus" variant="text" size="small" @click="handleMinimize"></v-btn>

    <v-btn
      :icon="cs.isMax ? `mdi-checkbox-multiple-blank-outline` : `mdi-checkbox-blank-outline`"
      variant="text"
      size="small"
      class="ms-2"
      @click="handleMaximize"
    ></v-btn>

    <v-btn icon="mdi-close" variant="text" class="ms-2" size="small" @click="handleClose"></v-btn>
  </v-system-bar>
</template>

<style lang="scss" scoped></style>
