<!--
  AppFileUploadAlert
  @author 谭期元
  @date  2023/09/30
  @description “文件上传提示”组件
-->

<script lang="ts" setup>
import { AppFileUpload } from '@/components/common'
import { reactive } from 'vue'

const props = defineProps({
  show: {
    type: Boolean
  },
  title: {
    type: String,
    default: '暂无文件'
  }
})

const cs = reactive({
  fileUpload: {
    show: false
  }
})
</script>

<template>
  <AppFileUpload :show="cs.fileUpload.show" @update:show="(show) => (cs.fileUpload.show = show)" />
  <v-alert
    density="compact"
    variant="outlined"
    prominent
    border="top"
    :title="title"
    class="ma-5"
    v-if="show"
  >
    <template #text>
      <p class="pa-1">
        点击
        <v-btn size="x-small" icon="mdi-cloud-upload" @click="cs.fileUpload.show = true"> </v-btn>
        按钮即刻开始上传。
      </p>
    </template>
  </v-alert>
</template>

<style lang="scss" scoped></style>
