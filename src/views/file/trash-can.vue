<!--
  trash-can
  @author 谭期元
  @date  2023/10/10
  @description “垃圾篓（回收站）”页面
-->
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useElementSize, useKeyModifier, useMagicKeys } from '@vueuse/core'
import { AppTrashCanIconView, AppListView } from './components'
import { useAppStore, useFileStore } from '@/stores'
import { MoYunFile } from '@/types/models'

const containerRef = ref(null)
const { width } = useElementSize(containerRef)
const controlState = useKeyModifier('Control') // 绑定Control键实现 多选

const appStore = useAppStore()
const fileStore = useFileStore()

onMounted(async () => {
  if (fileStore.search) return
  // 没有全局搜索才执行
  if (!appStore.search) {
    // 查询已经删除的文件
    fileStore.fetch(1)
  }
})

/**
 * 全选
 */
useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === 'a' && e.type === 'keydown') {
      e.preventDefault()
      fileStore.selectAll()
    }
  }
})

const handleDoubleClick = (item: MoYunFile) => {
  console.log('双击..', item)
  if (item.extension === 'file') {
    console.log('不受打开支持的文件...')
  } else if (item.extension === 'folder') {
    console.log('文件夹')
  } else if (item.extension === 'mp3') {
    console.log('音乐')
  }
}
/**
 * 上下文右键菜单
 * @param event
 */
const handleContextRightMenu = (event: MouseEvent) => {
  // console.log('内容区右键菜单')
  event.preventDefault()
  return
}

/**
 * 文件右键菜单
 * @param event 菜单原生事件
 * @param file 文件
 */
const handleFileRightClick = async (event: MouseEvent, file: MoYunFile) => {
  // console.log('右键文件菜单')
  event.preventDefault()
  return
}
</script>

<template>
  <v-container
    ref="containerRef"
    class="w-min fill-height align-start"
    @contextmenu="handleContextRightMenu"
  >
    <!-- 图标视图 -->
    <AppTrashCanIconView
      v-if="fileStore.view === 'icon'"
      :fileList="fileStore"
      :width="width"
      :multiple="!!controlState"
      @doubleClick="handleDoubleClick"
      @rightClick="handleFileRightClick"
    />

    <!-- 列表视图 -->
    <AppListView
      v-else-if="fileStore.view === 'list'"
      :multiple="!!controlState"
      @doubleClick="handleDoubleClick"
      @rightClick="handleFileRightClick"
    />
  </v-container>
</template>

<style lang="scss" scoped></style>
