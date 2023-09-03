<!--
  TheFile
  @author 谭期元
  @date  2023/08/07
  @description “文件”组件
-->
<script lang="ts" setup>
import { reactive, ref } from 'vue'

const props = defineProps(['fileName', 'fileIcon'])
const componentSettings = reactive({
  size: 150, // 文件图标大小
  showActionsMenu: false
})

const handleDownload = () => {}
const handleCollect = () => {}
const handleShare = () => {}
</script>

<template>
  <!--  <v-card :width="componentSettings.size" :min-height="componentSettings.size" >-->
  <v-btn :size="componentSettings.size" :width="componentSettings.size" stacked v-bind="$attrs">
    <template #prepend>
      <v-icon :icon="`mdi-${fileIcon}`" color="#62B1FA" size="130"></v-icon>
    </template>
    <span class="file-text">{{ fileName }}</span>
  </v-btn>

  <!--    <v-card-actions v-if="componentSettings.showActionsMenu">-->
  <!--      <v-btn-->
  <!--          color="surface-variant"-->
  <!--          icon="mdi-monitor-arrow-down-variant"-->
  <!--          size="small"-->
  <!--          variant="text"-->
  <!--          @click="handleDownload"-->
  <!--      ></v-btn>-->

  <!--      <v-btn-->
  <!--          color="surface-variant"-->
  <!--          icon="mdi-heart-outline"-->
  <!--          size="small"-->
  <!--          variant="text"-->
  <!--          @click="handleCollect"-->
  <!--      ></v-btn>-->

  <!--      <v-btn-->
  <!--          color="surface-variant"-->
  <!--          icon="mdi-share-variant-outline"-->
  <!--          size="small"-->
  <!--          variant="text"-->
  <!--          @click="handleShare"-->
  <!--      ></v-btn>-->
  <!--    </v-card-actions>-->
  <!--  </v-card>-->
</template>

<style lang="scss">
.file-text {
  position: relative;
  bottom: 8px;
}
</style>