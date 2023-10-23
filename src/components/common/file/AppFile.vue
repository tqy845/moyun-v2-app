<!--
  AppFile
  @author 谭期元
  @date  2023/08/07
  @description “文件”组件
-->
<script lang="ts" setup>
import { ref } from 'vue'
import { usePrecision } from '@vueuse/math'
import { MoYunFile } from '@/types/models'
import { useFileStore } from '@/stores'
import { useElementSize } from '@vueuse/core'

const fileNameRef = ref()

const { height } = useElementSize(fileNameRef)
const fileStore = useFileStore()

defineProps({
  moYunFile: {
    type: MoYunFile,
    required: true
  }
})
</script>

<template>
  <v-btn
    :width="fileStore.itemSize - 70"
    :height="fileStore.itemSize + height - 50"
    stacked
    v-bind="$attrs"
    class="pa-0 ma-0 d-flex align-start flex-column"
    style="justify-content: flex-start"
  >
    <div class="text-center fill-height w-100 py-2 mb-11">
      <div class="mb-1 d-flex justify-center align-center">
        <v-icon
          color="info"
          :icon="`mdi-${moYunFile.icon}`"
          :size="fileStore.itemSize - 70"
        ></v-icon>
      </div>
      <div
        ref="fileNameRef"
        class="text-none w-100"
        :class="fileStore.selectedList.includes(moYunFile.name) ? null : ['file-name']"
        :style="{ height: `auto` }"
        style="position: absolute; z-index: 1; word-break: break-all"
      >
        {{ moYunFile.name }}
      </div>
    </div>
  </v-btn>
</template>

<style lang="scss">
.file-name {
  text-overflow: ellipsis !important;
  display: -webkit-box !important;
  -webkit-box-orient: vertical !important;
  -webkit-line-clamp: 3 !important; /* 这里是超出几行省略 */
  overflow: hidden !important;
  position: absolute;
  z-index: 99999 !important;
}

.progress-linear {
  position: absolute;
  top: 40px;
}
</style>
