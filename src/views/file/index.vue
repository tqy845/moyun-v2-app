<!--
  index
  @author 谭期元
  @date  2023/08/07
  @description “文件展示”首页
-->
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useElementSize, useKeyModifier, useMagicKeys, whenever } from '@vueuse/core'
import { AppFile } from '@/components/common'
import { AppBottomBar, AppBaseRightClickMenu, AppFileRightClickMenu } from './components'
import { useAppStore, File, useFileStore } from '@/stores'

const containerRef = ref(null)
const { width } = useElementSize(containerRef)
const controlState = useKeyModifier('Control') // 绑定Control键实现 多选

const appStore = useAppStore()
const fileStore = useFileStore()

const cs = reactive<{
  rightClickMenu: {
    show: boolean
    file: File
    x: number
    y: number
  }
}>({
  rightClickMenu: {
    show: false,
    file: {} as File,
    x: 0,
    y: 0
  }
})

const data = reactive<{
  fileList: Array<File>
  selected: number | Array<number>
}>({
  fileList: [
    new File({
      icon: 'file-cloud',
      name: 'demo_file.mp4',
      type: 'file'
    }),
    new File({
      icon: 'folder',
      name: '新建文件夹',
      type: 'folder'
    }),
    new File({
      icon: 'file-cloud',
      name: 'demo.docx',
      type: 'file'
    }),
    new File({
      icon: 'file-cloud',
      name: '文件3',
      type: 'file'
    }),
    new File({
      icon: 'file-cloud',
      name: '文件4',
      type: 'file'
    }),
    new File({
      icon: 'music-note',
      name: '爱你 - 陈芳语',
      type: 'mp3'
    }),
    new File({
      icon: 'file-cloud',
      name: '文件6',
      type: 'file'
    }),
    new File({
      icon: 'file-cloud',
      name: '文件7',
      type: 'file'
    }),
    new File({
      icon: 'file-cloud',
      name: '文件8',
      type: 'file'
    }),
    new File({
      icon: 'file-cloud',
      name: '文件9',
      type: 'file'
    }),
    new File({
      icon: 'file-cloud',
      name: '文件10',
      type: 'file'
    })
  ],
  selected: []
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
  for (let i = 0; i < data.fileList.length; i++) data.selected.push(i)
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

const handleDownload = async (file: File) => {
  console.log('下载文件...')
  // await fileStore.downloadByName(file.name)
}

const handleCollect = () => {
  console.log('收藏文件...')
}

const handleDelete = () => {
  console.log('删除文件...')
  data.fileList = data.fileList.filter((item, index) =>
    Array.isArray(data.selected) ? !data.selected.includes(index) : index !== data.selected
  )
  data.selected = []
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

const handleDoubleClick = (item: { type: string }) => {
  console.log('双击..', item)
  if (item.type === 'file') {
    console.log('不受打开支持的文件...')
  } else if (item.type === 'folder') {
    console.log('文件夹')
  } else if (item.type === 'mp3') {
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

const handleRightClick = (event: MouseEvent, file: File) => {
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
    <div v-if="width" :style="{ 'padding-left': `${((width - 32) % 158) / 2 + 15}px` }">
      <v-btn-toggle v-model="data.selected" :density="null" :multiple="!!controlState" class="pa-5">
        <v-row>
          <v-col v-for="(iterator, index) in data.fileList" :key="index" class="pa-1" cols="auto">
            <!-- 渲染文件-->
            <AppFile
              :file-item="iterator"
              elevation="0"
              style="background-color: rgba(0, 0, 0, 0)"
              @dblclick="handleDoubleClick(iterator)"
              @contextmenu.stop="handleRightClick($event, iterator)"
            />
          </v-col>
        </v-row>
      </v-btn-toggle>
    </div>
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
