<!--
  CustomButton
  @author 谭期元
  @date  2023/08/06
  @description “loading按钮”组件
-->
<script lang="ts" setup>
// @ts-nocheck
import { ref } from 'vue'

const isLoading = ref(false)
/**
 * 按钮点击事件处理
 * @param event
 * @returns {Promise<void>}
 */
const handleClick = async (event: any) => {
  // 当按钮被点击时，将 isLoading 设置为 true，表示按钮处于加载状态。
  isLoading.value = true
  try {
    // 尝试执行传递给按钮的 onTarget 函数，该函数应该是一个 Promise。
    const clickEvent = event['onTarget']
    if (clickEvent) {
      await clickEvent()
    }
  } catch (error) {
    // 如果执行 onTarget 函数时出现错误，则在控制台打印错误信息。
    console.error(error)
  } finally {
    // 无论函数onTarget是否执行成功，都会将 isLoading 设置为 false，表示加载状态结束。
    setTimeout(() => (isLoading.value = false), 100)
  }
}
</script>

<template>
  <v-btn :disabled="isLoading" :loading="isLoading" v-bind="$attrs" @click="handleClick($attrs)">
    <template v-for="(_, key, index) in $slots" :key="index" v-slot:[key]>
      <slot :name="key"></slot>
    </template>
  </v-btn>
</template>

<style lang="scss" scoped></style>
