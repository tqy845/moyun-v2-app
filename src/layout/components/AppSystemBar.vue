<!--
  AppSystemBar
  @author 谭期元
  @date  2023/09/29
  @description “系统栏”组件
-->

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { appWindow } from '@tauri-apps/api/window'
import { useAppStore } from '@/stores'

const appStore = useAppStore()

const cs = reactive({
  /**
   * 窗口是否最大化
   */
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
}

/**
 * 关闭
 */
const handleClose = () => {
  appWindow.close()
}

onMounted(async () => {
  /**
   * 监听窗口大小变化
   */
  await appWindow.onResized(async () => {
    cs.isMax = await appWindow.isMaximized()
  })
})
</script>

<template>
  <v-system-bar window data-tauri-drag-region :color="`#212121`">
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
