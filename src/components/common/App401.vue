<!--
  App401
  @author 谭期元
  @date  2023/10/14
  @description “401认证失败”组件
-->

<script lang="ts" setup>
import { useAppStore, useUserStore } from '@/stores'

const appStore = useAppStore()
const userStore = useUserStore()
</script>

<template>
  <v-dialog v-model="appStore['401']" persistent width="auto">
    <v-card>
      <v-card-title class="text-h5"> 认证失败 </v-card-title>
      <v-card-text>您的身份认证已过期，请重新登录。</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green-darken-1"
          variant="text"
          @click="
            // 用户登出
            userStore.logout(() => ($router.replace('/login'), (appStore['401'] = false)))
            // $router.replace('/login')
          "
        >
          确认
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped></style>
