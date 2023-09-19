<!--
  AppListView
  @author 谭期元
  @date  2023/09/19
  @description “列表视图”组件
-->

<script lang="ts" setup>
// @ts-nocheck
import { useDateFormat, useWindowSize } from '@vueuse/core'
import { fileUtils } from '@/utils/functions'
import { useFileStore } from '@/stores'

const { height } = useWindowSize()
const fileStore = useFileStore()

const props = defineProps<{
  selected: number | Array<number>
}>()

const headers = [
  { title: '名称', align: 'start', key: 'name' },
  { title: '修改日期', align: 'start', key: 'lastModified' },
  { title: '类型', align: 'center', key: 'extension' },
  { title: '大小', align: 'end', key: 'size' }
]

window.addEventListener('wheel', fileUtils.listViewMouseWheel)
</script>

<template>
  <v-data-table-virtual
    fixed-header
    :headers="headers"
    :items="fileStore.fileList"
    class="elevation-1"
    :height="height - 100"
    item-value="name"
  >
    <template v-slot:item.name="{ item }">
      <v-row justify="start" align="center">
        <v-icon :icon="`mdi-` + item.raw.icon" size="30" class="mr-1" color="#62B1FA"></v-icon>
        {{ item.columns.name.replace('.' + item.raw.extension, '') }}
      </v-row>
    </template>
    <template v-slot:item.lastModified="{ item }">
      <v-row justify="start">
        {{ useDateFormat(item.columns.lastModified, 'YYYY/MM/DD H:mm:ss').value }}
      </v-row>
    </template>
    <template v-slot:item.size="{ item }">
      <v-row justify="end">
        {{ fileUtils.formatSize(item?.columns?.size) }}
      </v-row>
    </template>
  </v-data-table-virtual>
  <!-- 必须有一个元素在后面不然不会响应缩小的高度 -->
  <br />
</template>

<style lang="scss" scoped></style>
