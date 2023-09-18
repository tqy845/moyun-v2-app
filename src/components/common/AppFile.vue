<!--
  AppFile
  @author 谭期元
  @date  2023/08/07
  @description “文件”组件
-->
<script lang="ts" setup>
import { reactive } from 'vue'
import { usePrecision } from '@vueuse/math'
import { UseMousePressed } from '@vueuse/components'
import { File } from '@/types/models'

defineProps<{
  fileItem: File
}>()

const cs = reactive({
  size: 150, // 文件图标大小
  showActionsMenu: false
})

const handleDownload = () => {}
const handleCollect = () => {}
const handleShare = () => {}
</script>

<template>
  <v-btn :size="cs.size" :width="cs.size" stacked v-bind="$attrs">
    <template #prepend>
      <v-row class="flex-column">
        <v-col>
          <!-- 文件图标 -->
          <v-icon :icon="`mdi-${fileItem.icon}`" color="#62B1FA" size="130"></v-icon>
        </v-col>
        <v-col class="progress-linear">
          <!-- 进度条 -->
          <v-progress-linear
            :model-value="typeof fileItem.power === 'number' ? fileItem.power : 0"
            :active="!!fileItem.power && fileItem.power !== 'completed'"
            :indeterminate="fileItem.power === 'awaiting'"
            color="deep-purple-accent-3"
            height="25"
            rounded
            striped
          >
            <template v-slot:default="{ value }">
              <strong>{{ usePrecision(value, 2) }}%</strong>
            </template>
          </v-progress-linear>
        </v-col>
      </v-row>
    </template>
    <!-- 文件名 -->
    <div
      class="file-text text-none"
      style="max-width: 150px; white-space: normal; word-wrap: break-word"
    >
      {{ fileItem.name }}
    </div>
  </v-btn>
</template>

<style lang="scss">
.file-text {
  position: relative;
  bottom: 8px;
}
.progress-linear {
  position: absolute;
  top: 40px;
}
</style>
