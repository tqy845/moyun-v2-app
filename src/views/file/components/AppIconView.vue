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
import { AppFileLoading, AppFileNullAlert, AppPathBar } from '.'
import { AppRightMenu } from '../components'
import { RightMenuItem } from '@/types/enums/right-menu'
import { MoYunFile } from '@/types/models'
import { ACTION_TYPE } from '@/types/enums'

const rightMenuRef = ref<HTMLElement | null>(null)
const cardRef = ref()
const rowRef = ref()

const windowSize = useWindowSize()
const rightMenuSize = useElementSize(rightMenuRef)

const appStore = useAppStore()
const fileStore = useFileStore()

const emits = defineEmits(['rightClick'])

const props = defineProps<{
  width: number
  multiple: boolean
}>()

const cs = reactive({
  rightMenu: {
    show: false,
    location: { x: 0, y: 0 },
    menuItems: [] as Array<RightMenuItem>,
    moYunFile: null as MoYunFile | null
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

/**
 * 选中文件
 * @param index 文件索引
 */
const handleSelectItem = (index: any) => {
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
  if (fileStore.contextRightMenuItems.map((item) => item.type).includes(item.actionType)) {
    rightMenuUtils.contextRightMenuEvent(item.actionData)
  } else {
    rightMenuUtils.fileRightMenuEvent(item.actionData, cs.rightMenu.moYunFile!)
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
  type: 'context' | 'file' = 'context',
  moYunFile?: MoYunFile
) => {
  event.preventDefault()
  cs.rightMenu.show = false
  switch (type) {
    case 'context':
      fileStore.contextRightMenuItems.filter(
        (it) => it.type === ACTION_TYPE.NEW_FOLDER
      )[0].element = cardRef.value.$el
      cs.rightMenu.menuItems = fileStore.contextRightMenuItems
      break
    case 'file':
      fileStore.fileRightMenuItems[0]['icon'] = moYunFile!.icon
      fileStore.fileRightMenuItems[0]['color'] = moYunFile!.iconColor

      cs.rightMenu.moYunFile = moYunFile!
      cs.rightMenu.menuItems = fileStore.fileRightMenuItems
      if (!fileStore.selectedList.includes(fileStore.renderList[index].name)) {
        handleSelectItem(index)
      }
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
  <!-- 导航条 -->
  <v-toolbar border density="compact">
    <v-row align="center" justify="start">
      <v-col cols="auto" class="">
        <AppPathBar />
      </v-col>
      <!-- 右侧分栏 -->
      <v-spacer></v-spacer>
      <v-col cols="auto" style="width: 180px !important" class="justify-center text-center">
        <v-btn
          icon="mdi-arrow-left-bottom"
          @click="fileStore.back"
          class=""
          :disabled="fileStore.breadcrumbItems.length <= 1"
        ></v-btn>
        <v-btn icon="mdi-folder-plus-outline" @click="fileStore.createFolder(cardRef?.$el)"></v-btn>
        <v-btn icon="mdi-refresh" @click="fileStore.fetch()" class=""></v-btn>
      </v-col>
    </v-row>
  </v-toolbar>
  <!-- 文件图标列表 -->
  <v-card
    class="w-100 ma-0 pa-0"
    :height="windowSize.height.value - 180"
    @contextmenu="handleRightMenu"
  >
    <div class="w-100 h-100">
      <!-- 读取中 -->
      <AppFileLoading class="mt-16" v-if="fileStore.loading" />
      <!-- 渲染 -->
      <v-btn-toggle
        v-show="!fileStore.show && fileStore.renderList.length"
        :density="null"
        :model-value="
          fileStore.selectedList.map((it_name) =>
            fileStore.renderList.findIndex((it) => it.name === it_name)
          )
        "
        class="h-100 w-100"
      >
        <v-row v-if="width" class="ma-0 pa-0 align-content-start overflow-auto w-100" ref="cardRef">
          <v-col
            v-for="(moYunFile, index) in fileStore.renderList"
            :key="index"
            cols="auto"
            class="mo-yun-file ma-0"
            :style="{
              height: fileStore.itemSize - 25 + 'px',
              width: (width - 8.5) / Math.floor(width / (fileStore.itemSize - 70)) + 'px'
            }"
            ref="rowRef"
          >
            <!-- 渲染文件-->
            <AppFile
              class="bg-transparent"
              :moYunFile="moYunFile"
              elevation="0"
              @click="handleSelectItem(index)"
              @dblclick="fileUtils.doubleClick(moYunFile)"
              @contextmenu.stop="handleRightMenu($event, index, 'file', moYunFile)"
            />
          </v-col>
        </v-row>
      </v-btn-toggle>
      <!-- 无内容 -->
      <AppFileNullAlert
        :title="`${
          fileStore.breadcrumbItems.length !== 1 ? $t('file.view.folder.null.text') : ''
        }【${$t(
          fileStore.classMenuItems.filter(
            (it) => it.key === appStore['app']['menuIndex']['currentFileClassifyTab']
          )?.[0]?.['label']
        )}】${$t('file.view.null.text')}`"
      />
    </div>
    <!-- <v-card-action>
      <v-pagination
        :model-value="
          fileStore.classifyTabCurrentPage[appStore.app.menuIndex['currentFileClassifyTab']]
        "
        :length="pageItemNumber"
        total-visible="6"
        @update:modelValue="fileStore.changePage"
      ></v-pagination>
    </v-card-action> -->
  </v-card>

  <!-- 上下文右键菜单 -->
  <AppRightMenu
    ref="rightMenuRef"
    id="right-menu"
    :menuItems="cs.rightMenu.menuItems"
    :location="cs.rightMenu.location"
    :mo-yun-file="cs.rightMenu.moYunFile"
    :style="{ visibility: cs.rightMenu.show ? 'visible' : 'hidden' }"
    @confirm="handleContextRightMenuConfirm"
    @cancel="cs.rightMenu.show = false"
  />
</template>

<style lang="scss" scoped></style>
