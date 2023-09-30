<!--
  index
  @author 谭期元
  @date  2023/08/07
  @description “文件展示”首页
-->
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useElementSize, useKeyModifier, useMagicKeys, whenever } from '@vueuse/core'
import {
  AppBottomBar,
  AppBaseRightClickMenu,
  AppFileRightClickMenu,
  AppIconView,
  AppListView
} from './components'
import { useAppStore, useFileStore } from '@/stores'
import { BasicFile } from '@/types/models'

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
  selected: number | Array<number>
}>({
  selected: []
})

onMounted(async () => {
  // fileStore.list()
})

/**
 * 绑定Ctrl + A实现全选目标
 */
const { ctrl_a } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === 'a' && e.type === 'keydown') e.preventDefault()
  }
})
whenever(ctrl_a, () => {
  console.log('全选')
  data.selected = []
  for (let i = 0; i < fileStore.fileList.length; i++) data.selected.push(i)
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

const handleRightClick = (event: MouseEvent, file: BasicFile) => {
  console.log('右键文件菜单', file)
  event.preventDefault()
  const { clientX, clientY } = event
  cs.rightClickMenu = {
    x: clientX,
    y: clientY,
    show: true,
    file
  }
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
      :selected="data.selected"
      @doubleClick="handleDoubleClick"
      @rightClick="handleRightClick"
    />

    <!-- 列表视图 -->
    <AppListView
      v-else-if="fileStore.fileView === 'list'"
      :selected="data.selected"
      @doubleClick="handleDoubleClick"
      @rightClick="handleRightClick"
    />

    <!--文件底部操作菜单-->
    <AppBottomBar v-if="Array.isArray(data.selected) && data.selected?.length > 1" />

    <!-- 右键菜单 -->
    <!-- {{ cs.rightClickMenu }}
    <AppBaseRightClickMenu
      :style="{ top: cs.rightClickMenu.y + 'px', left: cs.rightClickMenu.x + 'px' }"
    /> -->

    <AppFileRightClickMenu
      :file="cs.rightClickMenu.file"
      v-show="cs.rightClickMenu.show"
      :style="{ top: cs.rightClickMenu.y + 'px', left: cs.rightClickMenu.x + 'px' }"
      @close="cs.rightClickMenu.show = false"
    />
    <!-- <AppDownWindow /> -->
  </v-container>
</template>

<style lang="scss" scoped></style>
