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
  tab?: string | null
  tabItems: Array<{ label: string; icon: string; key: string }>
  fileList: Array<BasicFile>
}>({
  tab: null,
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
  ],
  fileList: []
})

/**
 * 切换标签
 * @param item 标签项
 */
const handleChangeTab = (item: unknown) => {
  console.log('切换标签', item)
  // const { key, index } = item as { label: string; icon: string; key: string; index: number }
  appStore.app.menuIndex['appIconViewTab'] = item as {
    label: string
    icon: string
    key: string
    index: number
  }
}

/**
 * 分页
 * @param item
 */
const handleChangePage = (item: any) => {
  console.log('换页', item)
  let { iconViewPageItemNumber } = fileStore
  const startIndex = (item - 1) * iconViewPageItemNumber
  const endIndex = startIndex + iconViewPageItemNumber
  data.fileList = fileStore
    .classify(appStore.app.menuIndex['appIconViewTab']?.key ?? 'all')
    .slice(startIndex, endIndex)
}

/**
 * 计算分页数
 */
const pageItemNumber = computed(() => {
  const { iconViewPageItemNumber } = fileStore
  const _fileList = fileStore.classify(appStore.app.menuIndex['appIconViewTab']?.key ?? 'all')
  const calc = Math.ceil(_fileList.length / iconViewPageItemNumber)
  return _fileList.length % 2 === 0 ? calc : calc + 1
})

/**
 * 鼠标事件
 */
window.addEventListener('wheel', fileUtils.iconViewMouseWheel)

onMounted(async () => {
  await fileStore.list()
  data.fileList = fileStore.classify(appStore.app.menuIndex['appIconViewTab']?.key ?? 'all')
  handleChangePage(1)
})
</script>

<template>
  <!-- 二级菜单 -->
  <v-app-bar>
    <v-row class="w-100 px-7" justify="start">
      <v-tabs
        v-model="appStore.app.menuIndex['appIconViewTab']"
        centered
        stacked
        show-arrows
        color="primary"
        @update:modelValue="handleChangeTab"
      >
        <v-tab
          class="text-capitalize"
          v-for="(item, index) in data.tabItems"
          :key="index"
          :value="{ ...item, index }"
        >
          <v-icon>mdi-{{ item.icon }}</v-icon> {{ $t(item.label) }}
        </v-tab>
      </v-tabs>
    </v-row>
  </v-app-bar>

  <!-- 文件图标列表 -->
  <v-card class="w-100" :height="windowSize.height.value - 195">
    <div :style="{ height: `${windowSize.height.value - 260}px` }" style="overflow: auto">
      <!-- 读取中 -->
      <AppFileLoading class="mt-16 w-100" v-if="fileStore.loading" />
      <!-- 渲染 -->
      <v-btn-toggle
        v-else-if="data.fileList.length"
        v-model="selected"
        :density="null"
        :multiple="multiple"
        class="pa-5 w-100"
      >
        <v-row v-if="width" :style="{ 'padding-left': `${(width % 158) / 2 + 15}px` }">
          <v-col v-for="(iterator, index) in data.fileList" :key="index" class="px-1" cols="auto">
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
      <AppFileUploadAlert :show="!data.fileList.length && !fileStore.loading" />
    </div>
    <v-card-action>
      <v-pagination
        :length="pageItemNumber"
        total-visible="6"
        @update:modelValue="handleChangePage"
      ></v-pagination>
    </v-card-action>
  </v-card>
</template>

<style lang="scss" scoped></style>
