<!--
  AppUserCard
  @author 谭期元
  @date  2023/09/29
  @description “用户卡片”组件
-->
<script lang="ts" setup>
import { useUserStore } from '@/stores'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

const cs = reactive({
  fav: true,
  menu: false,
  message: false,
  hints: true
})

const user = reactive({
  initials: '谭',
  fullName: '谭期元',
  username: '卡的淋漓尽致',
  email: 'tqy845@outlook.com'
})

/**
 * 退出
 */
const handleLogout = () => {
  userStore.logout()
  router.replace('/login')
  cs.menu = false
}

/**
 * 前往设置页面
 */
const toSettingPage = () => {
  router.push('/setting')
  cs.menu = false
}
</script>

<template>
  <v-menu v-model="cs.menu" :close-on-content-click="false" location="end">
    <template v-slot:activator="{ props }">
      <v-list v-bind="props">
        <v-list-item :subtitle="user?.email" :title="user?.username">
          <template #prepend>
            <v-avatar size="x-small" color="surface-variant">{{ user.initials }}</v-avatar>
          </template>
        </v-list-item>
      </v-list>
    </template>

    <v-card min-width="300">
      <v-list>
        <v-list-item :subtitle="user?.email" :title="user?.username">
          <template #prepend>
            <v-avatar color="surface-variant">{{ user.initials }}</v-avatar>
          </template>
          <template v-slot:append>
            <v-btn
              variant="text"
              :class="cs.fav ? 'text-red' : ''"
              icon="mdi-heart"
              @click="cs.fav = !cs.fav"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item value="setting" @click="toSettingPage">
          <template v-slot:prepend>
            <v-icon icon="mdi-cog"></v-icon>
          </template>
          <v-list-item-title> {{ $t('preferences.text') }} </v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-switch v-model="cs.message" color="purple" label="接收消息" hide-details></v-switch>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn variant="text" color="error" @click="handleLogout"> {{ $t('logout.text') }} </v-btn>
        <!-- <v-btn color="primary" variant="text" @click="cs.menu = false"> Save </v-btn> -->
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<style lang="scss" scoped></style>
