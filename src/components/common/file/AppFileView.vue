<!--
  AppFileView
  @author 谭期元
  @date  2023/09/19
  @description “文件视图”切换组件
-->

<script lang="ts" setup>
import { useFileStore } from '@/stores'

const fileStore = useFileStore()

const views = [
  {
    label: 'file.view.iconLabel.text',
    icon: 'credit-card-chip',
    value: 'icon'
  },
  {
    label: 'file.view.listLabel.text',
    icon: 'view-list',
    value: 'list'
  }
]

/**
 *  切换视图
 * @param item 视图选项
 */
const handleSwitchView = (item: any) => {
  fileStore.view = item.value
}
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn :="$attrs" icon v-bind="props">
        <v-icon>mdi-view-comfy</v-icon>
      </v-btn>
    </template>
    <v-list density="compact" nav>
      <v-list-subheader>{{ $t('toggle.view') }}</v-list-subheader>
      <v-list-item
        v-for="(item, index) in views"
        :key="index"
        :value="index"
        @click="handleSwitchView(item)"
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
