<!--
  AppUserCard
  @author 谭期元
  @date  2023/09/29
  @description “用户卡片”组件
-->
<script lang="ts" setup>
import { AppLanguage, AppTheme } from '@/components/common'
import { useAppStore, useUserStore } from '@/stores'
import { computed } from 'vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()

const cs = reactive({
  fav: true,
  menu: false,
  message: false,
  hints: true
})

/**
 * 前往设置页面
 */
const toSettingPage = () => {
  router.push('/setting')
  appStore.initKeySelectedMenuItem()
  appStore.app.menuIndex['currentUserCenterMenuTab'] = 'setting'
  cs.menu = false
}

const selectedMenuItem = computed(() => [appStore.app.menuIndex['currentUserCenterMenuTab']])
</script>

<template>
  <v-menu v-model="cs.menu" :close-on-content-click="false" location="end">
    <template v-slot:activator="{ props }">
      <v-list v-bind="props">
        <v-list-item :subtitle="userStore.user?.userName" :title="userStore.user?.nickName">
          <template #prepend>
            <v-avatar size="x-small" color="primary">{{ userStore.nameInitial }}</v-avatar>
          </template>
        </v-list-item>
      </v-list>
    </template>

    <v-card min-width="300">
      <v-list>
        <v-list-item :subtitle="userStore.user.email" :title="userStore.user.nickName">
          <template #prepend>
            <v-avatar color="primary">{{ userStore.nameInitial }}</v-avatar>
          </template>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list v-model:selected="selectedMenuItem">
        <v-list-item value="setting" @click="toSettingPage">
          <template v-slot:prepend>
            <v-icon icon="mdi-cog"></v-icon>
          </template>
          <v-list-item-title> {{ $t('preferences.text') }} </v-list-item-title>
        </v-list-item>

        <!-- 语言切换 -->
        <AppLanguage location="end">
          <template #context>
            <v-list-item value="toggle-language">
              <template v-slot:prepend>
                <v-icon icon="mdi-translate"></v-icon>
              </template>
              <v-list-item-title>
                {{ $t('toggle.language') }}
              </v-list-item-title>
            </v-list-item>
          </template>
        </AppLanguage>

        <!-- 主题切换 -->
        <AppTheme location="end">
          <template #context>
            <v-list-item value="toggle-theme">
              <template v-slot:prepend>
                <v-icon icon="mdi-theme-light-dark"></v-icon>
              </template>
              <v-list-item-title>
                {{ $t('toggle.theme') }}
              </v-list-item-title>
            </v-list-item>
          </template>
        </AppTheme>
        <!-- <v-list-item>
          <v-switch v-model="cs.message" color="purple" label="接收消息" hide-details></v-switch>
        </v-list-item> -->
      </v-list>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          variant="text"
          color="error"
          @click="
            // 用户登出
            userStore.logout(() => {
              $router.replace('/login')
              cs.menu = false
            })
          "
        >
          {{ $t('logout.text') }}
        </v-btn>
        <!-- <v-btn color="primary" variant="text" @click="cs.menu = false"> Save </v-btn> -->
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<style lang="scss" scoped></style>
