<!--
  AppIconView
  @author 谭期元
  @date  2023/09/19
  @description “图标视图”组件
-->

<script lang="ts" setup>
import {reactive, computed, onMounted, watch, onUpdated} from 'vue'
import {AppFile} from '@/components/common'
import {useWindowSize} from '@vueuse/core'
import {useAppStore, useFileStore} from '@/stores'
import {fileUtils} from '@/utils/functions'
import {AppFileLoading, AppFileNullAlert} from '.'
import {FileType} from '@/types/enums'
import {BasicFile} from "@/types/models";

const windowSize = useWindowSize()

const appStore = useAppStore()
const fileStore = useFileStore()

const emits = defineEmits(['doubleClick', 'rightClick'])

const props = defineProps<{
  width: number
  multiple: boolean
}>()

/**
 * 鼠标事件
 */
window.addEventListener('wheel', fileUtils.iconViewMouseWheel)

onMounted(() => {
})

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
            <v-breadcrumbs :items="['','垃圾篓']">
              <template v-slot:divider>
                <v-icon icon="mdi-chevron-right"></v-icon>
              </template>
              <template v-slot:prepend>
                <v-icon size="small" :icon="'mdi-' + 'folder-open'"></v-icon>
              </template>
            </v-breadcrumbs>
          </v-col>
          <v-col cols="auto" class="">
            <v-btn prepend-icon="mdi-delete-empty" size="large">清空垃圾篓</v-btn>
            <v-btn prepend-icon="mdi-delete-restore" size="large" @click="fileStore.fetch()">还原所有内容</v-btn>
          </v-col>
        </v-row>
      </template>
    </v-toolbar>
    <div :style="{ height: `${windowSize.height.value - 240}px` }" style="overflow: auto">
      <!-- 读取中 -->
      <AppFileLoading class="mt-16 w-100" v-if="fileStore.loading"/>
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
                v-click-outside="{
                handler: () => (fileStore.selectedList.length = 0),
                closeConditional: () => fileStore.selectedList.includes(iterator.name)
              }"
            />
          </v-col>
        </v-row>
      </v-btn-toggle>
      <!-- 无内容 -->
      <AppFileNullAlert/>
    </div>
  </v-card>

  <!-- 右键菜单 -->
  <AppFileRightClickMenu/>
</template>

<style lang="scss" scoped>
:deep(.v-breadcrumbs-item--disabled) {
  opacity: inherit !important;
}

</style>
