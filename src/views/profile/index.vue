<!--
  index
  @author 谭期元
  @date  2023/08/07
  @description “文件展示”首页
-->
<script lang="ts" setup>
import { computed, reactive, ref, watchEffect } from 'vue'
import { useElementSize, useKeyModifier, useMagicKeys, whenever } from '@vueuse/core'
import { TheFIleBar, TheFile, TheFileBottomMenu } from '@/components/common'
import { useAppStore } from '@/stores'

const el = ref(null)
const { width } = useElementSize(el)
const controlState = useKeyModifier('Control') // 绑定Control键实现 多选

const appStore = useAppStore()

const data = reactive({
  fileList: [
    {
      icon: 'file-cloud',
      fileName: '文件1',
      type: 'file'
    },
    {
      icon: 'folder',
      fileName: '新建文件夹',
      type: 'folder',
      children: [
        {
          icon: 'file-cloud',
          fileName: '文件1',
          type: 'file'
        },
        {
          icon: 'file-cloud',
          fileName: '文件2',
          type: 'file'
        },
        {
          icon: 'file-cloud',
          fileName: '文件3',
          type: 'file'
        },
        {
          icon: 'file-cloud',
          fileName: '文件4',
          type: 'file'
        }
      ]
    },
    {
      icon: 'folder',
      fileName: '新建文件夹2',
      type: 'folder',
      children: [
        {
          icon: 'file-cloud',
          fileName: '文件1',
          type: 'file'
        },
        {
          icon: 'file-cloud',
          fileName: '文件2',
          type: 'file'
        },
        {
          icon: 'file-cloud',
          fileName: '文件3',
          type: 'file'
        },
        {
          icon: 'file-cloud',
          fileName: '文件4',
          type: 'file'
        }
      ]
    },
    {
      icon: 'file-cloud',
      fileName: '文件2',
      type: 'file'
    },
    {
      icon: 'file-cloud',
      fileName: '文件3',
      type: 'file'
    },
    {
      icon: 'file-cloud',
      fileName: '文件4',
      type: 'file'
    },
    {
      icon: 'music-note',
      fileName: '爱你 - 陈芳语',
      type: 'mp3'
    },
    {
      icon: 'file-cloud',
      fileName: '文件6',
      type: 'file'
    },
    {
      icon: 'file-cloud',
      fileName: '文件7',
      type: 'file'
    },
    {
      icon: 'file-cloud',
      fileName: '文件8',
      type: 'file'
    },
    {
      icon: 'file-cloud',
      fileName: '文件9',
      type: 'file'
    },
    {
      icon: 'file-cloud',
      fileName: '文件10',
      type: 'file'
    }
  ],
  toggleSelected: [] || ''
})

const cs = reactive({
  isMultiple: controlState.value
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
  data.toggleSelected = data.fileList.map((item) => item.fileName)

  appStore.globalMessage('全选', 'success')
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
  console.log('删除文件', data.toggleSelected)
  data.fileList = data.fileList.filter((item) => !data.toggleSelected.includes(item.fileName))
  data.toggleSelected = []
})

const handleDownload = () => {
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

const handleDbClick = (item) => {
  console.log('双击..', item)
  if (item.type === 'file') {
    console.log('不受打开支持的文件...')
  } else if (item.type === 'folder') {
  } else if (item.type === 'mp3') {
    console.log('音乐..')
  }
}
const breadcrumbItems = computed(() => {
  const items = []
  let currentPath = '/'

  // for (const item of data.fileList) {
  //   if (currentPath === '/') {
  //     items.push({ text: '主页', path: currentPath })
  //   } else {
  //     items.push({ text: item.fileName, path: currentPath })
  //   }

  //   if (item.type === 'folder') {
  //     currentPath += `${item.fileName}/`
  //   }
  // }

  return items
})
</script>

<template>
  <v-container ref="el" class="" style="min-width: 100%">
    <!-- 导航条-->
    <TheFIleBar :items="breadcrumbItems" @item-click="navigateToFolder" />
    <div
      v-if="width"
      :style="{ 'padding-left': `${((width - 32) % 158) / 2 + 15}px` }"
      style="min-width: 100%"
    >
      <v-btn-toggle
        v-model="data.toggleSelected"
        :density="null"
        :multiple="!!controlState"
        class="pa-5"
      >
        <v-row>
          <v-col v-for="(iterator, index) in data.fileList" :key="index" class="pa-1" cols="auto">
            <!-- 渲染文件-->
            <TheFile
              :file-icon="iterator.icon"
              :file-name="iterator.fileName"
              :value="iterator.fileName"
              elevation="0"
              style="background-color: rgba(0, 0, 0, 0)"
              @dblclick="handleDbClick(iterator)"
            />
          </v-col>
        </v-row>
      </v-btn-toggle>
    </div>
    <!--文件底部操作菜单-->
    {{ data.toggleSelected }}
    <TheFileBottomMenu v-if="data.toggleSelected?.length" />
  </v-container>
</template>

<style lang="scss" scoped></style>
