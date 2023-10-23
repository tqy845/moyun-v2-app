<!--
  AppFile
  @author 谭期元
  @date  2023/08/07
  @description “文件”组件
-->
<script lang="ts" setup>
import { usePrecision } from '@vueuse/math'
import { MoYunFile } from '@/types/models'
import { useFileStore } from '@/stores'

const fileStore = useFileStore()

defineProps({
  fileItem: {
    type: MoYunFile,
    required: true
  }
})
</script>

<template>
  <v-btn
    :size="fileStore.itemSize + 15"
    :width="fileStore.itemSize"
    stacked
    v-bind="$attrs"
    class="pa-0 ma-0"
  >
    <template #prepend>
      <v-row class="flex-column">
        <v-col class="pt-5">
          <!-- 文件图标 -->
          <v-icon
            :icon="`mdi-${fileItem.icon}`"
            color="#62B1FA"
            :size="fileStore.itemSize - 54"
          ></v-icon>
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
    <p class="text-none file-name" :style="{ width: `${fileStore.itemSize - 35}px` }">
      {{ fileItem.name }}
    </p>
  </v-btn>
</template>

<style lang="scss">
.file-name {
  height: 60px;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 这里是超出几行省略 */
  overflow: hidden;
  position: relative;
  bottom: 6px;
}

.progress-linear {
  position: absolute;
  top: 40px;
}
</style>
