<!--
  AppBottomBar
  @author 谭期元
  @date  2023/09/15
  @description “文件”底部操作栏
-->
<script lang="ts" setup>
import { reactive } from 'vue'
import { useFileStore } from '@/stores'

const fileStore = useFileStore()

const cs = reactive({
  downWindow: {
    show: true
  }
})

/**
 * 文件下载
 */
const handleDownload = async () => {
  console.log('下载文件...')
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
