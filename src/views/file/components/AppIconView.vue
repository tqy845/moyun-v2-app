<!--
  AppIconView
  @author 谭期元
  @date  2023/09/19
  @description “图标视图”组件
-->

<script lang="ts" setup>
import { reactive, nextTick, ref } from 'vue'
import { AppFile } from '@/components/common'
import { useElementSize, useWindowSize } from '@vueuse/core'
import { useAppStore, useFileStore } from '@/stores'
import { fileUtils, rightMenuUtils } from '@/utils/functions'
import { AppFileLoading, AppFileNullAlert, AppPathBar } from '.'
import { AppRightMenu } from '../components'
import { MoYunFile, RightMenuItem } from '@/types/models'

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
    moYunFile: {} as MoYunFile,
    multiple: props.multiple,
    index: 0
  }
})

/**
 * 鼠标事件
 */
window.addEventListener('wheel', fileUtils.iconViewMouseWheel)

/**
 * 选中文件
 * @param index 文件索引
 */
const handleSelectItem = (index: any) => {
  fileStore.selected(fileStore.renderList[index].name, props.multiple)
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
    @contextmenu="rightMenuUtils.enable($event, cs.rightMenu, cardRef?.$el, rightMenuSize)"
  >
    <div class="w-100 h-100">
      <!-- 读取中 -->
      <AppFileLoading v-if="fileStore.loading" />
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
              @contextmenu.stop="
                rightMenuUtils.enable(
                  $event,
                  cs.rightMenu,
                  cardRef?.$el,
                  rightMenuSize,
                  'file',
                  index,
                  moYunFile
                )
              "
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
  </v-card>

  <!-- 右键菜单 -->
  <AppRightMenu
    ref="rightMenuRef"
    id="right-menu"
    :menuItems="cs.rightMenu.menuItems"
    :location="cs.rightMenu.location"
    :moYunFile="cs.rightMenu.moYunFile"
    :style="{ visibility: cs.rightMenu.show ? 'visible' : 'hidden' }"
    @confirm="
      rightMenuUtils.confirm($event.type, $event.data, () =>
        nextTick(() => (cs.rightMenu.show = false))
      )
    "
    @cancel="cs.rightMenu.show = false"
  />
</template>

<style lang="scss" scoped></style>
