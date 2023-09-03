<!--
  login
  @author 谭期元
  @date  2023/08/06
  @description “注册”页面
-->
<script lang="ts" setup>
import { CtLoadingButton as cBtn } from '@/components/custom'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const router = useRouter()

const form = reactive({
  email: '',
  terms: false
})

const componentSettings = reactive({
  isSubmit: false
})

const rules = {
  required: (value: string) => !!value || i18n.t('email.required'),
  counter: (value: string) => value.length <= 20 || i18n.t('email.counter'),
  email: (value: string) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (pattern.test(value)) {
      componentSettings.isSubmit = true
      return true
    }
    componentSettings.isSubmit = false
    return i18n.t('email.invalid')
  }
}

const toLogin = () => {
  console.log('toLogin')
  router.push('/login')
}
</script>

<template>
  <v-form class="pa-5 w-100">
    <div class="w-100 text-center text-h5 mb-10">{{ $t('register') }}</div>
    <v-row class="form-item my-3" justify="center">
      <c-btn
        block
        class="text-none button-item"
        size="large"
        prepend-icon="mdi-wechat"
        variant="outlined"
        ><span class="font-weight-medium">{{ $t('wechat.login') }}</span></c-btn
      >
    </v-row>
    <v-row class="form-item my-3" justify="center">
      <c-btn
        block
        size="large"
        class="text-none button-item font-weight-black"
        prepend-icon="mdi-qqchat"
        variant="outlined"
        ><span class="font-weight-medium">{{ $t('qq.login') }}</span></c-btn
      >
    </v-row>
    <v-divider class="my-6"></v-divider>
    <v-row align="center" class="my-2 flex-column" justify="center">
      <v-text-field
        v-model="form.email"
        :hint="$t('email.hint')"
        :label="$t('email.label')"
        :rules="[rules.required, rules.email]"
        class="w-100"
        prepend-inner-icon="mdi-email"
        variant="outlined"
      ></v-text-field>
      <v-checkbox v-model="form.terms" :label="$t('register.terms')" color="secondary"></v-checkbox>
      <c-btn :disabled="!(componentSettings.isSubmit && form.terms)" color="primary">
        {{ $t('register.complete') }}
        <v-icon end icon="mdi-chevron-right"></v-icon>
      </c-btn>
    </v-row>

    <v-row align="center" justify="center">
      <span class="text-none text-button">{{ $t('account.have') }}</span>
      <c-btn class="text-none font-weight-bold" size="x-small" variant="text" @click="toLogin"
        >{{ $t('login.button') }}
      </c-btn>
    </v-row>
  </v-form>
</template>

<style lang="scss" scoped>
.button-item {
  border-left: none;
  border-right: none;
  border-radius: 0;
}
</style>
