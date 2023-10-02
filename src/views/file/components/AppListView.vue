<!--
  AppListView
  @author 谭期元
  @date  2023/09/19
  @description “列表视图”组件
-->

<script lang="ts" setup>
// @ts-nocheck
import { onMounted, ref } from 'vue'
import { useDateFormat, useElementSize, useWindowSize } from '@vueuse/core'
import { fileUtils } from '@/utils/functions'
import { useFileStore } from '@/stores'

const windowSize = useWindowSize()
const fileStore = useFileStore()

const emits = defineEmits(['rightClick', 'doubleClick'])
const props = defineProps<{
  multiple: boolean
}>()

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
</script>

<template>
  <!-- {{ fileStore.selectedList }} -->
  <v-data-table
    :loading="fileStore.loading"
    fixed-header
    :headers="headers"
    :items="fileStore.renderList"
    class="elevation-1"
    :height="windowSize.height.value - 180"
    item-value="name"
    :hover="{ background: '#f5f5f5' }"
    show-select
    v-model="fileStore.selectedList"
  >
    <template v-slot:item="{ item }">
      <tr @click="handleClickTableRow(item)" @contextmenu.stop="emits('rightClick', $event, item)">
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
</template>

<style lang="scss" scoped></style>
