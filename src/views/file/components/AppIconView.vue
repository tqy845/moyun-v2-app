<!--
  AppIconView
  @author 谭期元
  @date  2023/09/19
  @description “图标视图”组件
-->

<script lang="ts" setup>
import { reactive, computed, onMounted, watch } from 'vue'
import { BasicFile } from '@/types/models'
import { AppFile, AppFileUpload } from '@/components/common'
import { createSharedComposable, useMagicKeys, useWindowSize } from '@vueuse/core'
import { useAppStore, useFileStore } from '@/stores'
import { fileUtils } from '@/utils/functions'
import { AppFileLoading, AppFileUploadAlert } from '.'

const windowSize = useWindowSize()

const appStore = useAppStore()
const fileStore = useFileStore()

const emits = defineEmits(['doubleClick', 'rightClick'])

const props = defineProps<{
  width: number
  selected: number | Array<number>
  multiple: boolean
}>()

const selected = computed(() => props.selected)

const data = reactive<{
  tabItems: Array<{ label: string; icon: string; key: string }>
}>({
  tabItems: [
    {
      label: 'file.view.iconLabel.secondaryMenu.all.text',
      icon: 'file',
      key: 'all'
    },
    {
      label: 'file.view.iconLabel.secondaryMenu.document.text',
      icon: 'briefcase',
      key: 'document'
    },
    {
      label: 'file.view.iconLabel.secondaryMenu.multimedia.text',
      icon: 'multimedia',
      key: 'media'
    }
  ]
})

/**
 * 计算分页数
 */
const pageItemNumber = computed(() => {
  const { iconViewPageItemNumber } = fileStore
  const _fileList = fileStore.classify(appStore.app.menuIndex['appIconViewTab']?.key ?? 'all')
  return Math.ceil(_fileList.length / iconViewPageItemNumber)
})

/**
 * 鼠标事件
 */
window.addEventListener('wheel', fileUtils.iconViewMouseWheel)

onMounted(() => {
  if (fileStore.search) return
  const { key } = appStore.app.menuIndex['appIconViewTab']
  fileStore.classify(key || 'all')
  fileStore.paging(fileStore.classifyTabCurrentPage[key] ?? 1)
})
</script>

<template>
  <!-- 文件图标列表 -->
  <v-card class="w-100" :height="windowSize.height.value - 130">
    <div :style="{ height: `${windowSize.height.value - 190}px` }" style="overflow: auto">
      <!-- 读取中 -->
      <AppFileLoading class="mt-16 w-100" v-if="fileStore.loading" />
      <!-- 渲染 -->
      <v-btn-toggle
        v-else-if="fileStore.currentFileList.length"
        v-model="selected"
        :density="null"
        :multiple="multiple"
        class="pa-5 w-100"
      >
        <v-row v-if="width" :style="{ 'padding-left': `${(width % 158) / 2 + 15}px` }">
          <v-col
            v-for="(iterator, index) in fileStore.currentFileList"
            :key="index"
            class="px-1"
            cols="auto"
          >
            <!-- 渲染文件-->
            <AppFile
              :file-item="iterator"
              elevation="0"
              style="background-color: rgba(0, 0, 0, 0)"
              @dblclick="emits('doubleClick', iterator)"
              @contextmenu.stop="emits('rightClick', $event, iterator)"
            />
          </v-col>
        </v-row>
      </v-btn-toggle>
      <!-- 无内容 -->
      <AppFileUploadAlert :show="!fileStore.currentFileList.length && !fileStore.loading" />
    </div>
    <v-card-action>
      <v-pagination
        :model-value="
          fileStore.classifyTabCurrentPage[appStore.app.menuIndex['appIconViewTab']?.key || 1]
        "
        :length="pageItemNumber"
        total-visible="6"
        @update:modelValue="fileStore.changePage"
      ></v-pagination>
    </v-card-action>
  </v-card>
</template>

<style lang="scss" scoped></style>
