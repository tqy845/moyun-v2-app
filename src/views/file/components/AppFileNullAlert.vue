<!--
  AppFileNullAlert
  @author 谭期元
  @date  2023/09/30
  @description “文件上传提示”组件
-->

<script lang="ts" setup>
import { AppFileUpload } from '@/components/common'
import { useFileStore } from '@/stores'

const fileStore = useFileStore()

const props = defineProps({
  title: {
    type: String
  }
})
</script>

<template>
  <!--  <AppFileUpload />-->
  <v-alert
    density="compact"
    variant="outlined"
    prominent
    border="top"
    :title="title ?? $t('file.view.null.text')"
    class="ma-5"
    v-if="!fileStore.renderList.length && !fileStore.loading"
  >
    <template #text>
      <p class="pa-1">
        {{ $t('file.view.null.button.text1') }}
        <v-btn size="x-small" icon="mdi-cloud-upload" @click="fileStore.show = true"> </v-btn>
        {{ $t('file.view.null.button.text2') }}
      </p>
    </template>
  </v-alert>
</template>

<style lang="scss" scoped></style>
