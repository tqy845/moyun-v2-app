<!--
  home
  @author 谭期元
  @date  2023/08/07
  @description “文件底部菜单”组件
-->
<script lang="ts" setup>
import { useFileStore } from '@/stores'

const fileStore = useFileStore()

/**
 * 文件下载
 */
const handleDownload = async () => {
  console.log('下载文件...', await fileStore.downloadByName('demo_file.mp4'))
}

const handleCollect = () => {
  console.log('收藏文件...')
}

const handleDelete = () => {
  console.log('删除文件...')
}

const handleShare = () => {
  console.log('分享文件...')
}

const handleRename = () => {
  console.log('重命名文件...')
}
</script>

<template>
  <v-bottom-navigation permanent>
    <v-btn @click="handleDownload">
      <v-icon>mdi-tray-arrow-down</v-icon>
      下载
    </v-btn>

    <v-btn>
      <v-icon>mdi-share-all-outline</v-icon>
      分享
    </v-btn>

    <v-btn>
      <v-icon>mdi-heart-outline</v-icon>
      收藏
    </v-btn>

    <v-btn>
      <v-icon>mdi-trash-can-outline</v-icon>
      删除
    </v-btn>
  </v-bottom-navigation>
</template>

<style lang="scss" scoped></style>
