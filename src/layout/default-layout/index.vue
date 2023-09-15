<!--
  DefaultLayout
  @author 谭期元
  @date  2023/07/26
  @description “默认”布局
-->
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { TheMainMenu } from '@/components/common'
import { useMagicKeys, whenever } from '@vueuse/core'
import { AppSearch, AppMenu, AppHeader } from './components'

const cs = reactive({
  search: {
    show: false
  }
})

const asideMenuShow = ref(true)

const user = reactive({
  initials: '谭',
  fullName: '谭期元',
  username: '卡的淋漓尽致',
  email: 'tqy845@outlook.com'
})

const handleProfile = () => {
  console.log('profile')
}

/**
 * 绑定ctrl k => 搜索·快捷键
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
  <v-app>
    <v-navigation-drawer :rail="asideMenuShow" class="border-none" color="grey-lighten-4" permanent>
      <!-- <v-list>
        <v-list-item @click="handleProfile" :subtitle="user?.email" :title="user?.username">
          <template #prepend> </template>
        </v-list-item>
      </v-list> -->
      <!-- <v-sheet :height="80">
        <v-row justify="center" class="">
          <v-col cols="6">
            <v-avatar color="surface-variant">{{ user.initials }}</v-avatar>
          </v-col>
        </v-row>
      </v-sheet> -->
      <v-sheet class="d-flex flex-column bg-surface-variant h-screen">
        <v-sheet class="">
          <v-list>
            <v-list-item @click="handleProfile" :subtitle="user?.email" :title="user?.username">
              <template #prepend>
                <v-avatar color="surface-variant">{{ user.initials }}</v-avatar>
              </template>
            </v-list-item>
          </v-list>
        </v-sheet>

        <v-sheet class="flex-1 h-100" @click="asideMenuShow = !asideMenuShow"
          ><TheMainMenu
        /></v-sheet>
      </v-sheet>
      <!-- <v-row class="flex-column">
        <v-col no-gutters class="bg-surface-variant">
          <v-list>
            <v-list-item
              prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
              title="John Leider"
              subtitle="Founder of Vuetify"
            >
              <template v-slot:append>
                <v-btn
                  variant="text"
                  :class="fav ? 'text-red' : ''"
                  icon="mdi-heart"
                  @click="fav = !fav"
                ></v-btn>
              </template>
            </v-list-item> </v-list
        ></v-col>
        <v-col cols="12" @click="asideMenuShow = !asideMenuShow" class="bg-pink">
          <TheMainMenu />
        </v-col>
      </v-row> -->
      <!-- 主菜单 -->
    </v-navigation-drawer>

    <v-navigation-drawer color="grey-lighten-5" nav permanent width="248">
      <!-- 搜索组件 -->
      <AppSearch v-model="cs.search.show" />

      <!-- 菜单组件 -->
      <AppMenu />
    </v-navigation-drawer>

    <v-main>
      <!-- 上边菜单条 -->
      <AppHeader />

      <!-- 内容区域 -->
      <RouterView />
    </v-main>
  </v-app>
</template>

<style lang="less" scoped></style>
