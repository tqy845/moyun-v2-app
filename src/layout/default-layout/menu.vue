<!--
  menu
  @author 谭期元
  @date  2023/09/15
  @description “菜单”组件
-->

<script lang="ts" setup>
import { reactive } from 'vue'
import { useMagicKeys, whenever } from '@vueuse/core'
import { AppSearch, AppMenu } from './components'

const cs = reactive({
  search: {
    show: false
  }
})

/**
 * 绑定ctrl k => 搜索快捷键
 */
const { ctrl_k } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === 'k' && e.type === 'keydown') e.preventDefault()
  }
})
whenever(ctrl_k, () => {
  console.log('搜索')
  cs.search.show = !cs.search.show
})
</script>

<template>
  <v-navigation-drawer color="grey-lighten-5" nav permanent width="248">
    <!-- 搜索组件 -->
    <AppSearch v-model="cs.search.show" />

    <!-- 菜单组件 -->
    <AppMenu />
  </v-navigation-drawer>
</template>

<style lang="scss" scoped></style>
