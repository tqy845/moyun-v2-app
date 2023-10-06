<!--
  index
  @author 谭期元
  @date  2023/08/07
  @description “文件展示”首页
-->
<script lang="ts" setup>
import { onUnmounted, onMounted, reactive, ref } from 'vue'
import { useElementSize, useKeyModifier, useMagicKeys, whenever } from '@vueuse/core'
import { AppIconView, AppListView } from './components'
import { useAppStore, useFileStore } from '@/stores'
import { BasicFile } from '@/types/models'
import { usePointer } from '@vueuse/core'
import { LogicalPosition, WebviewWindow } from '@tauri-apps/api/window'
import { listen } from '@tauri-apps/api/event'

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
  rightMenuListen: any
}>({
  rightMenu: null,
  unlisten: null,
  rightMenuListen: null
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

  data.rightMenu.once('tauri://created', function () {
    // webview window successfully created
    console.log('rightMenu created')
  })
  data.rightMenu.once('tauri://error', function (e:Event) {
    // an error happened creating the webview window
    console.error(e)
  })
  // 监听右键菜单聚焦
  // @ts-ignore
  data.unlisten = data.rightMenu.onFocusChanged(async ({ payload: focused }) => {
    if (!focused) {
      data.rightMenu.hide()
    }
  })

  data.rightMenuListen = await listen(
    'click',
    async (event: {
      windowLabel: string
      payload: { actionType: number | string; actionData: { [key: string]: any } }
    }) => {
      const {
        windowLabel,
        payload: { actionType, actionData }
      } = event
      // 右键菜单
      if (windowLabel === 'right-menu') {
        fileStore.rightMenu(actionType, actionData)
      }
      data.rightMenu.hide()
    }
  )

  if (fileStore.search) return
  // 没有全局搜索才执行
  if (!appStore.search) {
    fileStore.fetch()
  }
})

onUnmounted(async () => {
  console.log('卸载组件')
  data.rightMenu.close()
  ;(await data.unlisten)()
  ;(await data.rightMenuListen)()
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

const handleContextMenu = (event: MouseEvent) => {
  console.log('右键菜单')
  event.preventDefault()
  const { clientX, clientY } = event
  console.log(clientX, clientY)
  cs.rightClickMenu.x = clientX
  cs.rightClickMenu.y = clientY
}

const handleRightClick = async (event: MouseEvent, file: BasicFile) => {
  event.preventDefault();

  if (fileStore.selectedList.length <= 1) {
    fileStore.selected(file.name);
  }


  // 获取相对于浏览器窗口的鼠标坐标
  const clientX = event.clientX;
  const clientY = event.clientY;

  // 重设位置
  data.rightMenu.setPosition(new LogicalPosition(clientX, clientY));
  data.rightMenu.show(); // 显示
  data.rightMenu.setFocus(); // 置顶
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
      v-if="fileStore.view === 'icon'"
      :width="width"
      :multiple="!!controlState"
      @doubleClick="handleDoubleClick"
      @rightClick="handleRightClick"
    />

    <!-- 列表视图 -->
    <AppListView
      v-else-if="fileStore.view === 'list'"
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
