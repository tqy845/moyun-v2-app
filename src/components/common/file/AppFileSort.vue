<!--
  AppFileSort
  @author 谭期元
  @date  2023/10/27
  @description “文件排序”组件
-->

<script lang="ts" setup>
import { useFileStore } from '@/stores'
import { FileSortOrder, FileSortType } from '@/types/models'
import { computed } from 'vue'

const fileStore = useFileStore()

const sorts: Array<{ label: string; icon: string; value: FileSortType }> = [
  {
    label: 'file.sort.name.text',
    icon: 'format-text',
    value: 'name'
  },
  {
    label: 'file.sort.date.text',
    icon: 'file-clock',
    value: 'modify-date'
  },
  {
    label: 'file.sort.type.text',
    icon: 'format-list-bulleted-type',
    value: 'type'
  }
]

const sortOrders: Array<{ label: string; icon: string; value: FileSortOrder }> = [
  {
    label: 'file.sort.asc.text',
    icon: 'sort-descending',
    value: 'asc'
  },
  {
    label: 'file.sort.desc.text',
    icon: 'sort-ascending',
    value: 'desc'
  }
]

/**
 * 选中的排序类型和排序顺序
 */
const selectedTargets = computed(() => [
  ...fileStore.currentSortType,
  ...fileStore.currentSortOrder
])
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn :="$attrs" icon v-bind="props">
        <v-icon>mdi-sort</v-icon>
      </v-btn>
    </template>
    <v-list nav density="compact" v-model:selected="selectedTargets" select-strategy="classic">
      <v-list-subheader>{{ $t('toggle.sort') }}</v-list-subheader>
      <v-list-item
        v-for="(item, index) in sorts"
        :key="index"
        :value="item.value"
        @click="fileStore.sort(item.value)"
      >
        <template v-slot:prepend>
          <v-icon :icon="`mdi-` + item.icon"></v-icon>
        </template>
        <v-list-item-title>{{ $t(item.label) }}</v-list-item-title>
      </v-list-item>
      <v-divider class="my-1"></v-divider>
      <v-list-subheader>{{ $t('toggle.sort.order') }}</v-list-subheader>
      <v-list-item
        v-for="(item, index) in sortOrders"
        :key="index"
        :value="item.value"
        @click=";(fileStore.currentSortOrder[0] = item.value), fileStore.sort()"
      >
        <template v-slot:prepend>
          <v-icon :icon="`mdi-` + item.icon"></v-icon>
        </template>
        <v-list-item-title>{{ $t(item.label) }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style lang="scss" scoped></style>
