<!--
  AppFileUploadAlert
  @author 谭期元
  @date  2023/09/30
  @description “文件上传提示”组件
-->

<script lang="ts" setup>
import { useFileStore } from '@/stores'

const fileStore = useFileStore()
</script>

<template>
  <v-alert
    v-if="!fileStore.fileList.length"
    density="compact"
    variant="outlined"
    type="warning"
    prominent
    border="top"
    title="没有文件"
  >
    <template #text>
      <p class="pa-1">
        点击
        <AppFileUpload size="x-small" />
        按钮即刻开始上传文件，上传的文件会展示在这里。
      </p>
    </template>
  </v-alert>
</template>

<style lang="scss" scoped></style>
