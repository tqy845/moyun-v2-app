<!--
  AppIconView
  @author 谭期元
  @date  2023/09/19
  @description “图标视图”组件
-->

<script lang="ts" setup>
import { reactive, computed, onMounted, watch, onUpdated, nextTick, ref } from 'vue'
import { AppFile } from '@/components/common'
import { useElementSize, useWindowSize } from '@vueuse/core'
import { useAppStore, useFileStore } from '@/stores'
import { fileUtils, rightMenuUtils } from '@/utils/functions'
import { AppFileLoading, AppFileNullAlert } from '.'
import { AppRightMenu } from '../components'
import { RightMenuItem } from '@/types/enums/right-menu'

const rightMenuRef = ref()

const windowSize = useWindowSize()
const rightMenuSize = useElementSize(rightMenuRef)

const appStore = useAppStore()
const fileStore = useFileStore()

const emits = defineEmits(['doubleClick', 'rightClick'])

const props = defineProps<{
  width: number
  multiple: boolean
}>()

const cs = reactive({
  rightMenu: {
    show: false,
    location: { x: 0, y: 0 },
    menuItems: [] as Array<RightMenuItem>
  }
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

/**
 * 右键菜单点击
 * @param event
 */
const handleContextRightMenuConfirm = (item: {
  actionType: string | number
  actionData: RightMenuItem
}) => {
  // console.log(item, fileStore.fileRightMenuItems)
  if (fileStore.contextRightMenuItems.map((item) => item.type).includes(item.actionType)) {
    rightMenuUtils.contextRightMenuEvent(item.actionData)
  } else {
    rightMenuUtils.fileRightMenuEvent(item.actionData)
  }
  nextTick(() => {
    cs.rightMenu.show = false
  })
}

/**
 * 右键菜单
 * @param event
 */
const handleRightMenu = (
  event: MouseEvent,
  index: number,
  type: 'context' | 'file' = 'context'
) => {
  event.preventDefault()

  cs.rightMenu.show = false
  switch (type) {
    case 'context':
      cs.rightMenu.menuItems = fileStore.contextRightMenuItems
      break
    case 'file':
      cs.rightMenu.menuItems = fileStore.fileRightMenuItems
      handleSelectItem(index)
      break
  }
  setTimeout(() => {
    cs.rightMenu.show = true

    // 获取鼠标相对于视口的坐标
    const clientX = event.clientX
    const clientY = event.clientY
    // 计算菜单的 x 和 y 位置，确保不超出 v-card 范围
    let x = clientX
    let y = clientY

    // 获取菜单宽度和高度
    const menuWidth = rightMenuSize.width.value
    const menuHeight = rightMenuSize.height.value

    const windowWidth = windowSize.width.value
    const windowHeight = windowSize.height.value

    if (clientX + menuWidth > windowWidth) {
      // 菜单宽度超出当前元素右边界
      x = windowWidth - menuWidth - 18
    }

    if (clientY + menuHeight > windowHeight) {
      // 菜单高度超出当前元素下边界
      y = windowHeight - menuHeight - 20
    }

    // 重制位置
    cs.rightMenu.location = { x, y }
  })
}
</script>

<template>
  <!-- 文件图标列表 -->
  <v-card class="w-100" :height="windowSize.height.value - 130" @contextmenu="handleRightMenu">
    <v-toolbar border density="compact">
      <template #title>
        <v-row align="center">
          <v-col class="">
            <v-breadcrumbs :items="fileStore.breadcrumbItems">
              <template v-slot:divider>
                <v-icon icon="mdi-chevron-right"></v-icon>
              </template>
              <template v-slot:prepend>
                <v-icon size="small" :icon="'mdi-' + 'folder-open'" class="pr-5"></v-icon>
              </template>
            </v-breadcrumbs>
          </v-col>
          <v-col cols="auto" class="">
            <v-btn icon="mdi-folder-plus-outline" @click="fileStore.createFolder()"></v-btn>
            <v-btn icon="mdi-refresh" @click="fileStore.fetch()"></v-btn>
          </v-col>
        </v-row>
      </template>
    </v-toolbar>
    <div :style="{ height: `${windowSize.height.value - 240}px` }" style="overflow: auto">
      <!-- 读取中 -->
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
              @contextmenu.stop="handleRightMenu($event, index, 'file')"
              v-click-outside="{
                handler: () => (fileStore.selectedList.length = 0),
                closeConditional: () => fileStore.selectedList.includes(iterator.name)
              }"
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

  <!-- 上下文右键菜单 -->
  <AppRightMenu
    ref="rightMenuRef"
    id="right-menu"
    :menuItems="cs.rightMenu.menuItems"
    :location="cs.rightMenu.location"
    :style="{ visibility: cs.rightMenu.show ? 'visible' : 'hidden' }"
    @confirm="handleContextRightMenuConfirm"
    @cancel="cs.rightMenu.show = false"
  />
</template>

<style lang="scss" scoped></style>
