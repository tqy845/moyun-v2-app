<script lang="ts" setup>
import { languages, type LanguageItem } from '@/plugins/i18n/helper'
import { useI18n } from 'vue-i18n'
import { useCookies } from '@vueuse/integrations/useCookies'
import { reactive } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const { locale } = useI18n()
const cookies = useCookies(['locale'])
/**
 *  切换语言
 * @param item 语言选项
 */
const handleSwitchLanguage = (item: LanguageItem) => {
  console.log('切换语言', item)
  locale.value = item.value
  cookies.set('locale', item.value)
  cs.hint.show = true
}

const cs = reactive({
  hint: {
    show: false
  }
})

/**
 * 退出
 */
const handleLogout = () => {
  userStore.logout()
  router.replace('/login')
  cs.hint.show = false
}
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn :="$attrs" icon v-bind="props">
        <v-icon>mdi-translate</v-icon>
      </v-btn>
    </template>
    <v-list density="compact" nav>
      <v-list-subheader>{{ $t('toggle.language') }}</v-list-subheader>
      <v-list-item
        v-for="(item, index) in languages"
        :key="index"
        :value="index"
        @click="handleSwitchLanguage(item)"
      >
        <v-list-item-title>{{ item.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>

  <v-dialog width="500" v-model="cs.hint.show">
    <template v-slot:default="{ isActive }">
      <v-card :title="$t('change.i18n.hint.title')">
        <v-card-text> {{ $t('change.i18n.hint.content') }} </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :text="$t('logout.text')" color="error" @click="handleLogout"></v-btn>
          <v-btn :text="$t('confirm.text')" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style lang="scss" scoped></style>
