<!--
  AppMenu
  @author 谭期元
  @date  2023/09/15
  @description “菜单列表”组件
-->
<script lang="ts" setup>
import { useAppStore } from '@/stores'

const appStore = useAppStore()
const items = [
  { text: 'menu.file.text', icon: 'folder', path: '/personal/file' },
  {
    text: 'menu.synchro.disk.text',
    icon: 'harddisk',
    path: '/personal/synchro-disk'
  },
  {
    text: 'menu.trashcan.text',
    icon: 'trash-can',
    path: '/personal/trash-can'
  }
]

const handleChangeSecondMenuItem = (item: any) => {
  appStore.app.menuIndex['currentSecondMenuTab'] = item
}
</script>

<template>
  <v-list :lines="false" nav @click:select="handleChangeSecondMenuItem">
    <!-- 二级菜单 -->
    <v-list-item
      v-for="(item, index) in items"
      :key="index"
      :value="item"
      color="primary"
      :to="item.path"
    >
      <template v-slot:prepend>
        <v-icon :icon="`mdi-` + item.icon"></v-icon>
      </template>
      <!-- 菜单项标题 -->
      <v-list-item-title>{{ $t(item.text) }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<style lang="scss" scoped></style>
