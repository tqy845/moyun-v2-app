<!--
  index
  @author 谭期元
  @date  2023/08/07
  @description “文件展示”首页
-->
<script lang="ts" setup>
import { onUnmounted, onMounted, reactive, ref } from 'vue'
import { useElementSize, useKeyModifier, useMagicKeys, whenever } from '@vueuse/core'
import { AppBottomBar, AppBaseRightClickMenu, AppIconView, AppListView } from './components'
import { AppFileDeleteConfirm } from '@/components/common'
import { useAppStore, useFileStore } from '@/stores'
import { BasicFile } from '@/types/models'
import { usePointer } from '@vueuse/core'
import { LogicalPosition, WebviewWindow, LogicalSize } from '@tauri-apps/api/window'
import { onUpdated } from 'vue'
import { listen } from '@tauri-apps/api/event'
import { emit } from '@tauri-apps/api/event'
import { ACTION_TYPE } from '@/types/enums'

const pointer = usePointer()
const containerRef = ref(null)
const { width } = useElementSize(containerRef)
const controlState = useKeyModifier('Control') // 绑定Control键实现 多选

const appStore = useAppStore()
const fileStore = useFileStore()

const cs = reactive<{
  rightClickMenu: {
    show: boolean
    file: BasicFile
    x: number
    y: number
  }
}>({
  rightClickMenu: {
    show: false,
    file: {} as BasicFile,
    x: 0,
    y: 0
  }
})

const data = reactive<{
  rightMenu: any
  unlisten: any
}>({
  rightMenu: null,
  unlisten: null
})

onMounted(async () => {
  data.rightMenu = new WebviewWindow('right-menu', {
    url: '/right-menu',
    width: 256,
    height: 219,
    resizable: false,
    decorations: false,
    contentProtected: false,
    skipTaskbar: true,
    fileDropEnabled: false,
    transparent: true,
    visible: false
  })

  // 监听右键菜单聚焦
  // @ts-ignore
  data.unlisten = data.rightMenu.onFocusChanged(async ({ payload: focused }) => {
    if (!focused) {
      data.rightMenu.hide()
    }
  })

  const unlisten = await listen(
    'click',
    (event: {
      windowLabel: string
      payload: { actionType: number | string; actionData: { [key: string]: any } }
    }) => {
      const {
        windowLabel,
        payload: { actionType, actionData }
      } = event
      if (windowLabel === 'right-menu') {
        switch (actionType) {
          case ACTION_TYPE.DELETE:
            if (fileStore.currentSelectedFileList.length > 1) {
              // 批量删除
              fileStore.currentSelectedFileList.forEach((item) => {
                fileStore.currentFileList.find((it) => it.name === item)?.delete()
              })
            } else {
              // 删除单个
              fileStore.currentFileList
                .find((item) => item.name === fileStore.currentSelectedFileList[0])
                ?.delete()
            }
            break
        }
        data.rightMenu.hide()
      }
    }
  )
  if (fileStore.search) return
  fileStore.list()
})

onUnmounted(async () => {
  console.log('卸载组件')
  ;(await data.unlisten)()
  data.rightMenu.close()
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

/**
 * 绑定Ctrl + D实现删除选中文件
 */
const { ctrl_d } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === 'd' && e.type === 'keydown') e.preventDefault()
  }
})
whenever(ctrl_d, () => {
  console.log('删除文件')
  handleDelete()
})

const handleDownload = async (file: BasicFile) => {
  console.log('下载文件...')
}

const handleCollect = () => {
  console.log('收藏文件...')
}

const handleDelete = () => {
  console.log('删除文件...')
}

const handleShare = () => {
  console.log('分享文件...')
}

const handleRename = () => {
  console.log('重命名文件...')
}

const navigateToFolder = (item: any) => {
  // Add your logic here for handling folder navigation
  console.log('Navigate to folder:', item)
}

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

const handleContextMenu = (event: MouseEvent) => {
  console.log('右键菜单')
  event.preventDefault()
  const { clientX, clientY } = event
  console.log(clientX, clientY)
  cs.rightClickMenu.x = clientX
  cs.rightClickMenu.y = clientY
}

const handleRightClick = async (event: MouseEvent, file: BasicFile) => {
  // console.log('右键文件菜单', event, file)
  event.preventDefault()
  fileStore.selected(file.name)
  const { x, y } = pointer
  // 重设位置
  data.rightMenu.setPosition(
    new LogicalPosition(x.value + window.screenX, y.value + window.screenY)
  )
  data.rightMenu.show() // 显示
  data.rightMenu.setFocus() // 置顶
}
</script>

<template>
  <v-container
    ref="containerRef"
    class="w-min fill-height align-start"
    @contextmenu="handleContextMenu"
  >
    <!-- 图标视图 -->
    <AppIconView
      v-if="fileStore.fileView === 'icon'"
      :width="width"
      :multiple="!!controlState"
      @doubleClick="handleDoubleClick"
      @rightClick="handleRightClick"
    />

    <!-- 列表视图 -->
    <AppListView
      v-else-if="fileStore.fileView === 'list'"
      :multiple="!!controlState"
      @doubleClick="handleDoubleClick"
      @rightClick="handleRightClick"
    />

    <!--文件底部操作菜单-->
    <!-- <AppBottomBar /> -->

    <!-- 右键菜单 -->
    <!-- {{ cs.rightClickMenu }}
    <AppBaseRightClickMenu
      :style="{ top: cs.rightClickMenu.y + 'px', left: cs.rightClickMenu.x + 'px' }"
    /> -->

    <!-- <AppFileRightClickMenu
      :file="cs.rightClickMenu.file"
      v-show="cs.rightClickMenu.show"
      :style="{ top: cs.rightClickMenu.y + 'px', left: cs.rightClickMenu.x + 'px' }"
      @close="cs.rightClickMenu.show = false"
    /> -->
    <!-- <AppDownWindow /> -->
  </v-container>
</template>

<style lang="scss" scoped></style>
