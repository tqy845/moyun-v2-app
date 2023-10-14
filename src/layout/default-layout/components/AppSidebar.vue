<!--
  AppSidebar
  @author 谭期元
  @date  2023/09/15
  @description “侧边栏”组件
-->

<script lang="ts" setup>
import { AsideMenuItem, useAppStore } from '@/stores'
import { useRouter } from 'vue-router'

const router = useRouter()
const appStore = useAppStore()

/**
 * 选择菜单项
 * @param item 选中的菜单项
 */
const handleSelectItem = (item: AsideMenuItem) => {
  // console.log('选择菜单项', item)
  appStore.updateAsideMenuItem(item)
  router.push(item.route)
}
</script>

<template>
  <v-divider :thickness="1" class="border-opacity-1" color="gray"></v-divider>

  <v-list v-bind="$attrs">
    <!-- 一级菜单 -->
    <div v-for="(item, index) in appStore.asideMenu['itemList']" :key="index">
      <v-list-item
        v-if="item.show !== false"
        :title="$t(item.title)"
        :value="index"
        :active="item.active"
        @click="handleSelectItem(item)"
      >
        <template v-slot:prepend>
          <v-icon :icon="`mdi-${item.icon}`"></v-icon>
        </template>
      </v-list-item>
    </div>

    <!-- <v-list-item :title="$t('school.text')" value="school">
      <template v-slot:prepend>
        <v-icon icon="mdi-school"></v-icon>
      </template>
    </v-list-item>

    <v-list-item :title="$t('family.text')" value="home">
      <template v-slot:prepend>
        <v-icon icon="mdi-home-heart"></v-icon>
      </template>
    </v-list-item>

    <v-list-item :title="$t('rooms.text')" value="rooms">
      <template v-slot:prepend>
        <v-icon icon="mdi-sofa-single"></v-icon>
      </template>
    </v-list-item> -->
  </v-list>
</template>

<style lang="scss" scoped></style>
