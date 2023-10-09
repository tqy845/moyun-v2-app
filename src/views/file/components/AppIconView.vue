<!--
  AppIconView
  @author 谭期元
  @date  2023/09/19
  @description “图标视图”组件
-->

<script lang="ts" setup>
import { reactive, computed, onMounted, watch, onUpdated } from 'vue'
import { AppFile } from '@/components/common'
import { useWindowSize } from '@vueuse/core'
import { useAppStore, useFileStore } from '@/stores'
import { fileUtils } from '@/utils/functions'
import { AppFileLoading, AppFileNullAlert } from '.'
import { FileType } from '@/types/enums'

const windowSize = useWindowSize()

const appStore = useAppStore()
const fileStore = useFileStore()

const emits = defineEmits(['doubleClick', 'rightClick'])

const props = defineProps<{
  width: number
  multiple: boolean
}>()

const data = reactive<{
  tabItems: Array<{ label: string; icon: string; key: string }>
}>({
  tabItems: [
    {
      label: 'file.view.iconLabel.secondaryMenu.all.text',
      icon: 'file',
      key: FileType.All
    },
    {
      label: 'file.view.iconLabel.secondaryMenu.document.text',
      icon: 'briefcase',
      key: FileType.Document
    },
    {
      label: 'file.view.iconLabel.secondaryMenu.multimedia.text',
      icon: 'multimedia',
      key: FileType.Media
    }
  ]
})

/**
 * 计算分页数
 */
const pageItemNumber = computed(() => {
  const { iconViewPageItemNumber } = fileStore
  const _fileList = fileStore.classify(appStore.app.menuIndex['currentFileClassifyTab'])
  return Math.ceil(_fileList?.length / iconViewPageItemNumber)
})

/**
 * 鼠标事件
 */
window.addEventListener('wheel', fileUtils.iconViewMouseWheel)

onMounted(() => {})

const handleSelectItem = (index: any) => {
  // console.log('select', fileStore.renderList[index].name)
  fileStore.selected(fileStore.renderList[index].name, props.multiple)
}
</script>

<template>
  <!-- 文件图标列表 -->
  <v-card class="w-100" :height="windowSize.height.value - 130">
    <v-toolbar border density="compact">
      <template #title>
        <v-row align="center">
          <v-col class="">
            <v-breadcrumbs :items="fileStore.breadcrumbItems">
              <template v-slot:prepend>
                <v-icon size="small" :icon="'mdi-' + 'folder-open'"></v-icon>
              </template>
            </v-breadcrumbs>
          </v-col>
          <v-col cols="auto" class="">
            <v-btn icon="mdi-folder-plus-outline"></v-btn>
            <v-btn icon="mdi-refresh" @click="fileStore.fetch()"></v-btn>
          </v-col>
        </v-row>
      </template>
    </v-toolbar>
    <div :style="{ height: `${windowSize.height.value - 240}px` }" style="overflow: auto">
      <!-- 读取中 -->
      <!-- {{ fileStore.selectedList }} -->
      <AppFileLoading class="mt-16 w-100" v-if="fileStore.loading" />
      <!-- 渲染 -->
      <v-btn-toggle
        v-else-if="fileStore.renderList.length"
        v-show="!fileStore.show"
        :density="null"
        class="pa-5 w-100"
        :model-value="
          fileStore.selectedList.map((it_name) =>
            fileStore.renderList.findIndex((it) => it.name === it_name)
          )
        "
      >
        <v-row v-if="width" :style="{ 'padding-left': `${(width % 158) / 2 + 15}px` }">
          <v-col
            v-for="(iterator, index) in fileStore.renderList"
            :key="index"
            class="px-1"
            cols="auto"
          >
            <!-- 渲染文件-->
            <AppFile
              :file-item="iterator"
              elevation="0"
              style="background-color: rgba(0, 0, 0, 0)"
              @click="handleSelectItem(index)"
              @dblclick="emits('doubleClick', iterator)"
              @contextmenu.stop="emits('rightClick', $event, iterator)"
            />
          </v-col>
        </v-row>
      </v-btn-toggle>

      <!-- 无内容 -->
      <AppFileNullAlert />
    </div>
    <v-card-action>
      <v-pagination
        :model-value="
          fileStore.classifyTabCurrentPage[appStore.app.menuIndex['currentFileClassifyTab']]
        "
        :length="pageItemNumber"
        total-visible="6"
        @update:modelValue="fileStore.changePage"
      ></v-pagination>
    </v-card-action>
  </v-card>

  <!-- 右键菜单 -->
  <AppFileRightClickMenu />
</template>

<style lang="scss" scoped></style>
