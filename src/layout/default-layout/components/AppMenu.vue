<!--
  AppMenu
  @author 谭期元
  @date  2023/09/15
  @description “菜单列表”组件
-->
<script lang="ts" setup>
const items = [{ text: '文件', icon: 'mdi-folder', path: '/personal/file' }]
</script>

<template>
  <v-list :lines="false" nav>
    <!-- 菜单项 -->
    <v-list-item
      v-for="(item, index) in items"
      :key="index"
      :value="item"
      color="primary"
      :to="item.path"
    >
      <template v-slot:prepend>
        <v-icon :icon="item.icon"></v-icon>
      </template>
      <!-- 菜单项标题 -->
      <v-list-item-title>{{ item.text }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<style lang="scss" scoped></style>
