<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { TheAd, TheSwitchLanguage } from '@/components/common'
</script>

<template>
  <v-app>
    <v-navigation-drawer location="right" permanent width="480">
      <v-container>
        <!-- 第一行显示 logo -->
        <div class="d-flex align-center justify-center my-4">
          <img alt="Logo" height="100" src="/public/img/icons/512x512.png" width="100" />
        </div>

        <!-- 第二行是表单填写账号密码 -->
        <div>
          <RouterView />
        </div>

        <!-- 第三行是尾注 -->
        <div class="mt-4 px-4">
          <!-- i18n -->
          <TheSwitchLanguage icon size="small" />
        </div>
      </v-container>
      <!-- 尾注 copyright-->
      <div class="copyright text-center text-body-1 w-100" justify="center">
        ©2022-{{ new Date().getFullYear() }} aigs.ltd 版权所有
      </div>
    </v-navigation-drawer>

    <v-main class="align-center justify-center">
      <TheAd />
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
.copyright {
  bottom: 0;
  position: fixed;
}
</style>
