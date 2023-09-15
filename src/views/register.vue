<!--
  register
  @author 谭期元
  @date  2023/08/06
  @description “注册”页面
-->
<script lang="ts" setup>
import { AppPromiseButton as cBtn } from '@/components/custom'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores'

const i18n = useI18n()
const router = useRouter()
const userStore = useUserStore()

const cs = reactive({
  isSubmit: false,
  doneRegister: false
})

const data = reactive({
  doneHint: ''
})

const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  isAgreeTerms: false // 同意条款
})

const rules = {
  required: (value: string) => !!value || i18n.t('email.required'),
  counter: (value: string) => value.length <= 20 || i18n.t('email.counter'),
  email: (value: string) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (pattern.test(value)) {
      cs.isSubmit = true
      return true
    }
    cs.isSubmit = false
    return i18n.t('email.invalid')
  },
  password: (value: string) => {
    if (value.length >= 5) {
      cs.isSubmit = true
      return true
    }
    cs.isSubmit = false
    return i18n.t('password.counter')
  },
  confirmPassword: (value: string) => {
    if (value.length >= 5 && value === form.password) {
      cs.isSubmit = true
      return true
    }
    if (value !== form.password) {
      return i18n.t('password.notMatch')
    }
    cs.isSubmit = false
    return i18n.t('password.counter')
  }
}

const handleRegister = async () => {
  console.log('注册用户')
  const { code, message } = await userStore.registerByAccount(form)
  if (code === 200) {
    data.doneHint = message
    cs.doneRegister = true
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
      <!-- 邮箱号 -->
      <v-text-field
        size="small"
        v-model="form.email"
        :hint="$t('email.hint')"
        :label="$t('email.label')"
        :rules="[rules.required, rules.email]"
        class="w-100"
        prepend-inner-icon="mdi-email"
        variant="outlined"
      ></v-text-field>

      <!-- 密码 -->
      <v-text-field
        v-model="form.password"
        type="password"
        :hint="$t('password.hint')"
        :label="$t('password.text')"
        :rules="[rules.password]"
        class="w-100"
        prepend-inner-icon="mdi-lock"
        variant="outlined"
      ></v-text-field>

      <!-- 确认密码 -->
      <v-text-field
        v-model="form.confirmPassword"
        type="password"
        :hint="$t('password.hint')"
        :label="$t('password.confirm.text')"
        :rules="[rules.confirmPassword]"
        class="w-100"
        prepend-inner-icon="mdi-lock"
        variant="outlined"
      ></v-text-field>

      <!-- 条款 -->
      <v-checkbox
        v-model="form.isAgreeTerms"
        :label="$t('register.terms')"
        color="secondary"
      ></v-checkbox>

      <!-- 完成注册 -->
      <c-btn
        :disabled="!(cs.isSubmit && form.isAgreeTerms)"
        color="primary"
        @click="handleRegister"
      >
        {{ $t('register.complete') }}
        <v-icon end icon="mdi-chevron-right"></v-icon>
      </c-btn>
    </v-row>

    <!-- 前往登录 -->
    <v-row align="center" justify="center">
      <span class="text-none text-button">{{ $t('account.have') }}</span>
      <c-btn class="text-none font-weight-bold" size="x-small" variant="text" @click="toLogin"
        >{{ $t('login.button') }}
      </c-btn>
    </v-row>
  </v-form>

  <!-- 完成注册弹框 -->
  <v-dialog v-model="cs.doneRegister" width="auto">
    <v-card>
      <v-card-text>
        {{ data.doneHint }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="cs.doneRegister = false">{{
          $t('confirm.text')
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.button-item {
  border-left: none;
  border-right: none;
  border-radius: 0;
}
</style>
