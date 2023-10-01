<!--
  right-menu
  @author 谭期元
  @date  2023/10/01
  @description “右键菜单”页
-->

<script lang="ts" setup>
import { BasicFile } from '@/types/models'

const props = defineProps({
  file: {
    type: BasicFile,
    required: true
  }
})
const emits = defineEmits(['close'])

const items = [
  {
    text: 'DownLoad',
    icon: 'mdi-cloud-download',
    event: () => {
      console.log('下载')
      props.file.download()
    }
  },
  {
    text: 'Shared',
    icon: 'mdi-account-multiple',
    event: () => {
      console.log('分享')
    }
  },
  {
    text: 'Starred',
    icon: 'mdi-star',
    event: () => {
      console.log('收藏')
    }
  },
  {
    text: 'Recent',
    icon: 'mdi-history',
    event: () => {
      console.log('历史')
    }
  },
  {
    text: 'Recent',
    icon: 'mdi-history',
    event: () => {
      console.log('历史')
    }
  }
]

const handleClickMenuItem = (callback: Function) => {
  callback()
  emits('close')
}
</script>

<template>
  <v-card class="mx-auto elevation-1 rounded-lg" width="256" style="border: 1px solid #dcdcdc8a">
    <v-list class="px-2">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        color="primary"
        rounded="xl"
        @click="handleClickMenuItem(item.event)"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style lang="scss" scoped>
.v-card {
  position: absolute;
}
</style>
