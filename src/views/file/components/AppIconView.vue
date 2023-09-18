<!--
  AppIconView
  @author 谭期元
  @date  2023/09/19
  @description “图标视图”组件
-->

<script lang="ts" setup>
import { computed, watch } from 'vue'
import { File } from '@/types/models'
import { AppFile } from '@/components/common'
import { useMagicKeys } from '@vueuse/core'
import { reactive } from 'vue'
import { useFileStore } from '@/stores'

const fileStore = useFileStore()

const emits = defineEmits(['doubleClick', 'rightClick'])

const props = defineProps<{
  width: number
  data: {
    fileList: Array<File>
    selected: number | Array<number>
  }
  multiple: boolean
}>()

const data = computed(() => props.data)

function handleMouseWheel(event: WheelEvent) {
  // 检查 Ctrl 键是否按下
  if (event.ctrlKey) {
    // 阻止默认滚动行为，以防止页面滚动
    event.preventDefault()

    // 获取滚动方向
    const delta = event.deltaY

    // 根据滚动方向执行相应操作
    if (delta > 0) {
      // 向下滚动
      // console.log('Ctrl + 鼠标向下滚动')
      fileStore.fileItemSize -= 3
      // 在这里执行你的操作
    } else if (delta < 0) {
      // 向上滚动
      // console.log('Ctrl + 鼠标向上滚动')
      fileStore.fileItemSize += 3
      // 在这里执行你的操作
    }
  }
}

window.addEventListener('wheel', handleMouseWheel)
</script>

<template>
  <div v-if="width" :style="{ 'padding-left': `${((width - 32) % 158) / 2 + 15}px` }">
    <v-btn-toggle v-model="data.selected" :density="null" :multiple="multiple" class="pa-5">
      <v-row>
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
  </div>
</template>

<style lang="scss" scoped></style>
