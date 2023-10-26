<!--
  AppLanguageReload
  @author 谭期元
  @date  2023/10/14
  @description “切换语言重新登录提示”组件
-->

<script lang="ts" setup>
import { useAppStore, useUserStore } from '@/stores'

const appStore = useAppStore()
const userStore = useUserStore()
</script>

<template>
  <v-dialog width="500" v-model="appStore.changedLanguage">
    <template v-slot:default="{ isActive }">
      <v-card :title="$t('change.i18n.hint.title')">
        <v-card-text> {{ $t('change.i18n.hint.content') }} </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :text="$t('confirm.text')" @click="isActive.value = false"></v-btn>
          <v-btn
            :text="$t('restore.text')"
            color="success"
            @click="
              // 用户登出
              userStore.logout(
                () => ($router.replace('/login'), (appStore.changedLanguage = false))
              )
            "
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style lang="scss" scoped></style>
