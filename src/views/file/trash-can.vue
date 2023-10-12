<!--
  trash-can
  @author 谭期元
  @date  2023/10/10
  @description “垃圾篓（回收站）”页面
-->
<script lang="ts" setup>
import { onUnmounted, onMounted, reactive, ref, nextTick } from 'vue'
import { useElementSize, useKeyModifier, useMagicKeys, whenever } from '@vueuse/core'
import { AppTrashCanIconView, AppListView } from './components'
import { useAppStore, useFileStore } from '@/stores'
import { BasicFile } from '@/types/models'
import { LogicalPosition, WebviewWindow } from '@tauri-apps/api/window'
import { emit, listen } from '@tauri-apps/api/event'

const containerRef = ref(null)
const { width } = useElementSize(containerRef)
const controlState = useKeyModifier('Control') // 绑定Control键实现 多选

const appStore = useAppStore()
const fileStore = useFileStore()

const data = reactive<{
  rightMenuInstance?: WebviewWindow
  rightMenuFocusListen?: Function
  rightMenuListen?: Function
}>({})

onMounted(async () => {
  const basicSettings = appStore.app.settings['basicRightMenu']
  data.rightMenuInstance = new WebviewWindow('right-menu', {
    url: '/right-menu',
    width: 256,
    ...basicSettings
  })

  // 监听右键菜单聚焦
  data.rightMenuFocusListen = await data.rightMenuInstance!.onFocusChanged(
    async ({ payload: focused }) => {
      if (!focused) {
        data.rightMenuInstance?.hide()
      }
    }
  )

  data.rightMenuListen = await listen(
    'click',
    async (event: {
      windowLabel: string
      payload: {
        labelType: string
        actionType: number | string
        actionData: { [key: string]: any }
      }
    }) => {
      const {
        payload: { actionType, labelType, actionData }
      } = event
      // 右键菜单
      console.log('actionType = ', labelType)

      switch (labelType) {
        case 'fileRightMenu':
          fileStore.fileRightMenuCallBack(actionType, actionData)
          break
        case 'contextRightFileMenu':
          fileStore.contextRightMenuCallBack(actionType, actionData)
          break
      }
      data.rightMenuInstance?.hide()
    }
  )

  if (fileStore.search) return
  // 没有全局搜索才执行
  if (!appStore.search) {
    // 查询已经删除的文件
    fileStore.fetch(1)
  }
})

onUnmounted(async () => {
  console.log('卸载组件')
  data.rightMenuInstance!.close()
  data.rightMenuFocusListen!()
  data.rightMenuListen!()
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

const handleDoubleClick = (item: BasicFile) => {
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
  // 更新菜单项
  emit('action', {
    actionType: 'contextRightFileMenu',
    actionData: fileStore.contextRightMenuItems
  })
  // 获取屏幕绝对的鼠标坐标
  const { screenX, screenY } = event
  // 重设位置
  data.rightMenuInstance!.setPosition(new LogicalPosition(screenX, screenY))
}

/**
 * 文件右键菜单
 * @param event 菜单原生事件
 * @param file 文件
 */
const handleFileRightClick = async (event: MouseEvent, file: BasicFile) => {
  // console.log('右键文件菜单')
  event.preventDefault()
  return
  // 更新菜单项
  emit('action', { actionType: 'fileRightMenu', actionData: fileStore.fileRightMenuItems })
  // 是否多选
  if (fileStore.selectedList.length <= 1) {
    fileStore.selected(file.name)
  }
  // 获取屏幕绝对的鼠标坐标
  const { screenX, screenY } = event
  // 重设位置
  data.rightMenuInstance!.setPosition(new LogicalPosition(screenX, screenY))
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
