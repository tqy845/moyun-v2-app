<!--
  AppFileUploadButton
  @author 谭期元
  @date  2023/10/05
  @description “文件上传”按钮
-->

<script lang="ts" setup>
import { useFileStore } from '@/stores'
import { computed, reactive } from 'vue'
import { AppFileUpload } from '@/components/common'

const fileStore = useFileStore()

const cs = reactive({
  fileUploadPopUp: {
    show: false,
    init: false
  }
})

/**
 * 文件下载进度mini版
 */
const fileUploading = computed(() => {
  const success = fileStore.uploadQueue.all.filter(
    (item) => item.status === 'success' || item.status === 'error' || item.status === 'cancel'
  )
  const calc = (success.length / fileStore.uploadQueue.all.length) * 100
  return calc >= 100 ? 0 : calc
})
</script>

<template>
  <!-- 文件上传 -->
  <AppFileUpload />

  <v-progress-circular
    v-if="!isNaN(fileUploading) && fileUploading > 0"
    :width="3.5"
    :size="44"
    :model-value="fileUploading"
    color="yellow-darken-1"
  >
    <v-btn icon="mdi-cloud-upload" @click="fileStore.show = true"> </v-btn>
  </v-progress-circular>
  <v-btn v-else icon="mdi-cloud-upload" @click="fileStore.show = true"> </v-btn>
</template>

<style lang="scss" scoped></style>
