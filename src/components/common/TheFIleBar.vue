<!--
  home
  @author 谭期元
  @date  2023/08/07
  @description “首页”
-->
<script lang="ts" setup>
import { TheSwitchLanguage } from '@/components/common'

const props = defineProps({
  breadcrumbItems: {
    type: Array<{
      title: String
      disabled: Boolean
      href: String
    }>,
    default: () => []
  }
})
</script>

<template>
  <v-app-bar color="teal-darken-4">
    <template v-slot:image>
      <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
    </template>

    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>
      <v-breadcrumbs v-bind="$attrs"></v-breadcrumbs>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <TheSwitchLanguage />
  </v-app-bar>
</template>

<style lang="scss" scoped></style>