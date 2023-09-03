<!--
  home
  @author 谭期元
  @date  2023/08/07
  @description “文件底部菜单”组件
-->
<script lang="ts" setup></script>

<template>
  <v-bottom-navigation permanent>
    <v-btn>
      <v-icon>mdi-tray-arrow-down</v-icon>
      下载
    </v-btn>

    <v-btn>
      <v-icon>mdi-share-all-outline</v-icon>
      分享
    </v-btn>

    <v-btn>
      <v-icon>mdi-heart-outline</v-icon>
      收藏
    </v-btn>

    <v-btn>
      <v-icon>mdi-trash-can-outline</v-icon>
      删除
    </v-btn>
  </v-bottom-navigation>
</template>

<style lang="scss" scoped></style>
