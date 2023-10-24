<!--
  AppPathBar
  @author 谭期元
  @date  2023/10/24
  @description “文件地址栏”组件
-->

<script lang="ts" setup>
import { useFileStore } from '@/stores'
import { BreadcrumbItem } from '@/types/models/breadcrumb-item'

const fileStore = useFileStore()

const handleChange = (value: unknown) => {
  console.log('change = ', value)
  const endIndex = fileStore.breadcrumbItems.findIndex(
    (item) => item.path === (value as BreadcrumbItem).path
  )
  fileStore.breadcrumbItems = fileStore.breadcrumbItems.slice(0, endIndex + 1)
  fileStore.fetch()
}
</script>

<template>
  <v-row class="pa-0 ma-0" align="center">
    <v-icon size="large" :icon="'mdi-folder-open'" class="mx-4"></v-icon>
    <v-tabs
      show-arrows
      v-model="fileStore.breadcrumbItems[fileStore.breadcrumbItems.length - 1]"
      @update:modelValue="handleChange"
    >
      <v-tab
        v-for="(item, index) in fileStore.breadcrumbItems"
        :key="index"
        :value="item"
        variant="text"
      >
        <span class="text-h6">{{ item.title }}</span>
      </v-tab>
    </v-tabs>
  </v-row>
</template>

<style lang="scss" scoped></style>
