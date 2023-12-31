<!--
  AppLanguage
  @author 谭期元
  @date  2023/10/26
  @description “语言切换”组件
-->
<script lang="ts" setup>
import { languages, type LanguageItem } from '@/plugins/i18n/helper'
import { useI18n } from 'vue-i18n'
import { useCookies } from '@vueuse/integrations/useCookies'
import { reactive } from 'vue'
import { useAppStore, useFileStore, useUserStore } from '@/stores'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const appStore = useAppStore()
const userStore = useUserStore()
const fileStore = useFileStore()
const { locale } = useI18n()
const cookies = useCookies(['locale'])
/**
 *  切换语言
 * @param item 语言选项
 */
const handleSwitchLanguage = (item: LanguageItem) => {
  // console.log('切换语言', item)
  locale.value = item.value
  cookies.set('locale', item.value)
  // 如果未登录，则不需要提示
  if (!['/login', '/signup'].includes(route.path)) {
    appStore.changedLanguage = true
  }
}

const cs = reactive({
  hint: {
    show: false
  }
})

const selected = computed(() => [locale.value])
</script>

<template>
  <v-menu v-bind="$attrs">
    <template v-slot:activator="{ props }">
      <div v-if="$slots['context']" v-bind="props">
        <slot name="context"></slot>
      </div>
      <v-btn v-else :="$attrs" icon v-bind="props">
        <v-icon>mdi-translate</v-icon>
      </v-btn>
    </template>
    <v-list density="compact" nav v-model:selected="selected">
      <v-list-subheader>{{ $t('toggle.language') }}</v-list-subheader>
      <v-list-item
        v-for="(item, index) in languages"
        :key="index"
        :value="item.value"
        @click="handleSwitchLanguage(item)"
      >
        <v-list-item-title>{{ item.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style lang="scss" scoped></style>
