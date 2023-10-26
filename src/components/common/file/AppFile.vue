<!--
  AppFile
  @author 谭期元
  @date  2023/08/07
  @description “文件”组件
-->
<script lang="ts" setup>
import { ref } from 'vue'
import { MoYunFile } from '@/types/models'
import { useAppStore, useFileStore } from '@/stores'
import { useElementSize } from '@vueuse/core'
import { fileUtils } from '@/utils/functions'

const fileNameRef = ref()

const { height } = useElementSize(fileNameRef)
const fileStore = useFileStore()
const appStore = useAppStore()

defineProps({
  moYunFile: {
    type: MoYunFile,
    required: true
  }
})
</script>

<template>
  <v-btn
    :height="fileStore.itemSize + height - 90"
    stacked
    v-bind="$attrs"
    class="pa-0 ma-0 d-flex align-start flex-column justify-start w-100 align-center text-center"
  >
    <div class="text-center w-100 py-1">
      <div class="mb-0 w-100 justify-center align-center">
        <v-icon
          :icon="`mdi-${moYunFile.icon}`"
          :size="fileStore.itemSize - 120"
          :color="
            appStore['settings']['basic']['iconColorTheme'] === '1'
              ? moYunFile.iconColor
              : fileUtils.iconColors['pure']
          "
        ></v-icon>
      </div>
      <div
        ref="fileNameRef"
        class="text-none text-center w-100 position-absolute px-2"
        :class="
          fileStore.selectedList.includes(moYunFile.name) && fileStore.selectedList.length <= 1
            ? null
            : ['file-name']
        "
        style="word-break: break-all; left: 0; z-index: 1"
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
  z-index: 99999 !important;
  position: absolute !important;
}

.progress-linear {
  position: absolute;
  top: 40px;
}
</style>
