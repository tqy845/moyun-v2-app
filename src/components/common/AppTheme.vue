<!--
  AppTheme
  @author 谭期元
  @date  2023/10/26
  @description “主题切换”组件
-->

<script lang="ts" setup>
import { switchTheme } from '@/plugins'
import { useAppStore } from '@/stores'
import { computed } from 'vue'

const appStore = useAppStore()

const selected = computed(() => [appStore['settings']['basic']['colorTheme']])
</script>

<template>
  <v-menu v-bind="$attrs">
    <template v-slot:activator="{ props }">
      <div v-if="$slots['context']" v-bind="props">
        <slot name="context"></slot>
      </div>
      <v-btn v-else :="$attrs" icon v-bind="props">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </template>
    <v-list density="compact" nav v-model:selected="selected">
      <v-list-subheader>{{ $t('toggle.theme') }}</v-list-subheader>
      <v-list-item @click="switchTheme('light')" value="light">
        <v-list-item-title>{{ $t('toggle.theme.light.text') }}</v-list-item-title>
      </v-list-item>
      <v-list-item @click="switchTheme('dark')" value="dark">
        <v-list-item-title>{{ $t('toggle.theme.dark.text') }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style lang="scss" scoped></style>
