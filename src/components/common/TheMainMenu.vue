<!--
  home
  @author 谭期元
  @date  2023/08/07
  @version 0.0.1
  @description “主菜单”组件
-->
<script lang="ts" setup>
import { reactive } from 'vue'

const user = reactive({
  initials: '谭',
  fullName: '谭期元',
  username: '卡的淋漓尽致',
  email: 'tqy845@outlook.com'
})
</script>

<template>
  <v-list>
    <v-list-item :subtitle="user.email" :title="user.username">
      <template #prepend>
        <v-avatar color="surface-variant">{{ user.initials }}</v-avatar>
      </template>
    </v-list-item>
  </v-list>

  <v-divider :thickness="1" class="border-opacity-1" color="gray"></v-divider>

  <v-list>
    <v-list-item :title="$t('school.text')" value="school">
      <template v-slot:prepend>
        <v-icon icon="mdi-school"></v-icon>
      </template>
    </v-list-item>

    <v-list-item :title="$t('family.text')" value="home">
      <template v-slot:prepend>
        <v-icon icon="mdi-home-heart"></v-icon>
      </template>
    </v-list-item>

    <v-list-item :title="$t('people.text')" value="people">
      <template v-slot:prepend>
        <v-icon icon="mdi-account-circle"></v-icon>
      </template>
    </v-list-item>

    <v-list-item :title="$t('rooms.text')" value="rooms">
      <template v-slot:prepend>
        <v-icon icon="mdi-sofa-single"></v-icon>
      </template>
    </v-list-item>
  </v-list>
</template>

<style lang="scss" scoped></style>