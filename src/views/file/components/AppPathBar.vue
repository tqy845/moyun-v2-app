<!--
  AppPathBar
  @author 谭期元
  @date  2023/10/24
  @description “文件地址栏”组件
-->

<script lang="ts" setup>
import { ref } from 'vue'
import { useFileStore } from '@/stores'
const breadcrumbsRef = ref()
const fileStore = useFileStore()
</script>

<template>
  <v-breadcrumbs ref="breadcrumbsRef" :items="fileStore.breadcrumbItems" class="">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
    <template v-slot:prepend>
      <v-icon size="large" :icon="'mdi-' + 'folder-open'" class="px-4"></v-icon>
    </template>
    <template v-slot:title="{ item }">
      <v-btn block variant="text" class="pa-1 ma-0 text-h6" @click="fileStore.skipPath(item)">{{
        item.title
      }}</v-btn>
    </template>
  </v-breadcrumbs>
</template>

<style lang="scss" scoped></style>
