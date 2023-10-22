<!--
  AppListView
  @author 谭期元
  @date  2023/09/19
  @description “列表视图”组件
-->

<script lang="ts" setup>
// @ts-nocheck
import { onMounted, reactive, ref, nextTick } from 'vue'
import { useDateFormat, useWindowSize, useElementSize } from '@vueuse/core'
import { fileUtils, rightMenuUtils } from '@/utils/functions'
import { useFileStore } from '@/stores'
import { AppRightMenu } from '../components'

const rightMenuRef = ref()

const windowSize = useWindowSize()
const rightMenuSize = useElementSize(rightMenuRef)

const fileStore = useFileStore()

const emits = defineEmits(['rightClick', 'doubleClick'])
const props = defineProps<{
  multiple: boolean
}>()

const cs = reactive({
  rightMenu: {
    show: false,
    location: { x: 0, y: 0 },
    menuItems: [] as Array<RightMenuItem>
  }
})

const headers = [
  { title: '名称', align: 'start', key: 'name' },
  { title: '修改日期', align: 'start', key: 'lastModified' },
  { title: '类型', align: 'start', key: 'extension' },
  { title: '大小', align: 'start', key: 'size' }
]

onMounted(() => {})

window.addEventListener('wheel', fileUtils.listViewMouseWheel)

/**
 * 单击表格行
 * @param item
 * @param internalItem
 */
const handleClickTableRow = (item: any) => {
  fileStore.selected(item.name, props.multiple)
}

/**
 * 选中文件
 * @param index 文件索引
 */
const handleSelectItem = (index: any) => {
  // console.log('select', fileStore.renderList[index].name)
  fileStore.selected(fileStore.renderList[index].name, props.multiple)
}

/**
 * 右键菜单点击
 * @param event
 */
const handleContextRightMenuConfirm = (item: {
  actionType: string | number
  actionData: RightMenuItem
}) => {
  // console.log(item, fileStore.fileRightMenuItems)
  if (fileStore.contextRightMenuItems.map((item) => item.type).includes(item.actionType)) {
    rightMenuUtils.contextRightMenuEvent(item.actionData)
  } else {
    rightMenuUtils.fileRightMenuEvent(item.actionData)
  }
  nextTick(() => {
    cs.rightMenu.show = false
  })
}

/**
 * 右键菜单
 * @param event
 */
const handleRightMenu = (
  event: MouseEvent,
  index: number,
  type: 'context' | 'file' = 'context'
) => {
  event.preventDefault()

  cs.rightMenu.show = false
  switch (type) {
    case 'context':
      cs.rightMenu.menuItems = fileStore.contextRightMenuItems
      break
    case 'file':
      cs.rightMenu.menuItems = fileStore.fileRightMenuItems
      if (!fileStore.selectedList.includes(fileStore.renderList[index].name)) {
        handleSelectItem(index)
      }
      break
  }
  setTimeout(() => {
    cs.rightMenu.show = true

    // 获取鼠标相对于视口的坐标
    const clientX = event.clientX
    const clientY = event.clientY
    // 计算菜单的 x 和 y 位置，确保不超出 v-card 范围
    let x = clientX
    let y = clientY

    // 获取菜单宽度和高度
    const menuWidth = rightMenuSize.width.value
    const menuHeight = rightMenuSize.height.value

    const windowWidth = windowSize.width.value
    const windowHeight = windowSize.height.value

    if (clientX + menuWidth > windowWidth) {
      // 菜单宽度超出当前元素右边界
      x = windowWidth - menuWidth - 18
    }

    if (clientY + menuHeight > windowHeight) {
      // 菜单高度超出当前元素下边界
      y = windowHeight - menuHeight - 20
    }

    // 重制位置
    cs.rightMenu.location = { x, y }
  })
}
</script>

<template>
  <v-card class="w-100">
    <v-toolbar border density="compact">
      <template #title>
        <v-row align="center">
          <v-col class="">
            <v-breadcrumbs :items="fileStore.breadcrumbItems">
              <template v-slot:divider>
                <v-icon icon="mdi-chevron-right"></v-icon>
              </template>
              <template v-slot:prepend>
                <v-icon size="small" :icon="'mdi-' + 'folder-open'" class="pr-5"></v-icon>
              </template>
            </v-breadcrumbs>
          </v-col>
          <v-col cols="auto" class="">
            <v-btn icon="mdi-folder-plus-outline"></v-btn>
            <v-btn icon="mdi-refresh" @click="fileStore.fetch()"></v-btn>
          </v-col>
        </v-row>
      </template>
    </v-toolbar>
    <v-data-table
      :loading="fileStore.loading"
      fixed-header
      :headers="headers"
      :items="fileStore.renderList"
      class="elevation-1"
      :height="windowSize.height.value - 180 - 48"
      item-value="name"
      :hover="{ background: '#f5f5f5' }"
      show-select
      v-model="fileStore.selectedList"
      @contextmenu="handleRightMenu"
    >
      <template v-slot:item="{ item, index }">
        <tr
          @click="handleClickTableRow(item)"
          @contextmenu.stop="handleRightMenu($event, index, 'file')"
        >
          <td>
            <v-checkbox
              style="position: relative; right: 7px"
              class="d-flex"
              :value="item.name"
              v-model="fileStore.selectedList"
            ></v-checkbox>
          </td>
          <td>
            <v-chip variant="text" size="x-large" style="position: relative; right: 15px">
              <div class="text-truncate" style="width: 30vw">
                <v-icon :icon="`mdi-` + item.icon" size="30" class="mr-2" color="#62B1FA"></v-icon>
                <span style="position: relative; top: 2px">{{
                  item.name.replace('.' + item.extension, '')
                }}</span>
              </div>
            </v-chip>
          </td>
          <td>
            <v-row justify="start" @contextmenu.stop="emits('rightClick', $event, iterator)">
              {{ useDateFormat(item.lastModified, 'YYYY/MM/DD H:mm:ss').value }}
            </v-row>
          </td>
          <td>{{ item.extension }}</td>
          <td>{{ fileUtils.formatSize(item.size) }}</td>
        </tr>
      </template>
      <!-- <template v-slot:item.name="{ item }">
      <v-row
        @contextmenu.stop="emits('rightClick', $event, iterator)"
        class="d-inline-block text-truncate bg-red"
        style="width: 25vw"
        justify="start"
        align="center"
      >
        <v-icon :icon="`mdi-` + item.icon" size="30" class="mr-1" color="#62B1FA"></v-icon>
        {{ item.name.replace('.' + item.extension, '') }}
      </v-row>
    </template> -->
      <!-- <template v-slot:item.lastModified="{ item }">
      <v-row justify="start" @contextmenu.stop="emits('rightClick', $event, iterator)">
        {{ useDateFormat(item.lastModified, 'YYYY/MM/DD H:mm:ss').value }}
      </v-row>
    </template>

    <template v-slot:item.size="{ item }">
      <v-row justify="end">
        {{ fileUtils.formatSize(item.size) }}
      </v-row>
    </template> -->
    </v-data-table>
    <!-- 必须有一个元素在后面不然不会响应缩小的高度 -->
    <!-- <br /> -->
  </v-card>
  <!-- 右键菜单 -->
  <AppRightMenu
    ref="rightMenuRef"
    id="right-menu"
    :menuItems="cs.rightMenu.menuItems"
    :location="cs.rightMenu.location"
    :style="{ visibility: cs.rightMenu.show ? 'visible' : 'hidden' }"
    @confirm="handleContextRightMenuConfirm"
    @cancel="cs.rightMenu.show = false"
  />
</template>

<style lang="scss" scoped></style>
