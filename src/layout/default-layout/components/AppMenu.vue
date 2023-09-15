<!--
  AppMenu
  @author 谭期元
  @date  2023/09/15
  @description “菜单列表”组件
-->
<script lang="ts" setup>
const items = [{ text: '文件', icon: 'mdi-folder' }]
</script>

<template>
  <v-list :lines="false" nav>
    <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary">
      <template v-slot:prepend>
        <v-icon :icon="item.icon"></v-icon>
      </template>

      <v-list-item-title>{{ item.text }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<style lang="scss" scoped></style>
