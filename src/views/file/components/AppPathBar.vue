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

  <!-- <v-row class="pa-0 ma-0 bg-red" align="center">
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
  </v-row> -->
</template>

<style lang="scss" scoped></style>
