<!--
  login
  @author 谭期元
  @date  2023/08/06
  @version 1.0.1
  @description “登录”页面
-->
<script lang="ts" setup>
import { IconBiometric } from '@/components/icons'
import { AppPromiseButton as cBtn } from '@/components/custom'
import { touchUtils } from '@/utils/functions'
import { useRouter } from 'vue-router'
import { useUserStore, useAppStore } from '@/stores'
import { AppLoginByAccount } from './components'
import { reactive } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { UserProperties } from '@/types/models/user.ts'

const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()

const cs = reactive({
  showDialog: false,
  img: ''
})

/**
 * 前往注册
 */
const toSignUp = useDebounceFn(() => {
  console.log('signUp')
  router.push('/signup')
}, appStore.getDelay)
/**
 * 前往个人中心
 */
const toWelcome = () => {
  if (appStore['settings']['basic']['launchWelcome']) {
    router.replace('/welcome')
  } else {
    appStore.asideMenu.itemList[1].active = true
    router.replace('/personal')
  }
}

const codeImage = useDebounceFn(async () => {
  console.log('获取验证码')
  cs.img = await userStore.codeImage()
}, appStore.getDelay * 5)

/**
 * 使用微信授权登录
 */
const onLoginByWeChat = () => {
  console.log('onLoginByWeChat')
  // todo: 待实现微信授权
  toWelcome()
}

/**
 * 使用QQ授权登录
 */
const onLoginByQQ = () => {
  console.log('onLoginByQQ')
  // todo: 待实现QQ授权
  appStore.notification('!@3', 'success')
  setTimeout(() => appStore.notification('123123123', 'warning'), 100)
  setTimeout(() => appStore.notification('123123123', 'error'), 150)
  setTimeout(() => appStore.notification('123123123', 'info'), 450)
}

/**
 * 使用账户密码登录
 */
const loginByAccountHandler = async (form: UserProperties) => {
  console.log('使用账户登录')
  if (await userStore.userLoginByAccount(form)) {
    toWelcome()
  } else {
    await codeImage()
  }
}

const openLoginByAccount = useDebounceFn(async () => {
  cs.showDialog = true
  // 加载验证码
  await codeImage()
}, appStore.getDelay)

/**
 * 使用生物认证登录
 */
const onLoginByTouchID = async () => {
  console.log('login by touchID')
  // todo: 待实现生物认证授权
  if (!userStore.user.userName) {
    console.log('您还没有登录过此设备，暂无法使用该功能~')
  }
  console.log(await touchUtils.touchIDRegistered('tanqiyuan', '123456', 'teijeiawjtlaei'))

  // if (await userStore.userLoginByTouch({})) {
  //   toProfile()
  // }
}
</script>

<template>
  <v-form class="pa-5 w-100">
    <div class="w-100 text-center text-h5 mb-10">{{ $t('login') }}</div>
    <!-- <v-row class="form-item my-3" justify="center">
      <c-btn
        block
        size="large"
        class="text-none button-item"
        prepend-icon="mdi-wechat"
        variant="outlined"
        @click="onLoginByWeChat"
        ><span class="font-weight-medium">{{ $t('wechat.login') }}</span></c-btn
      >
    </v-row>

    <v-row class="form-item my-3" justify="center">
      <c-btn
        size="large"
        block
        class="text-none button-item font-weight-black"
        prepend-icon="mdi-qqchat"
        variant="outlined"
        @target="onLoginByQQ"
        ><span class="font-weight-medium">{{ $t('qq.login') }}</span></c-btn
      >
    </v-row> -->

    <v-row class="form-item my-3" justify="center">
      <c-btn
        block
        size="large"
        class="text-none button-item font-weight-black"
        prepend-icon="mdi-account"
        variant="outlined"
        @target="openLoginByAccount"
        ><span class="font-weight-medium">{{ $t('account.login') }}</span></c-btn
      >
    </v-row>

    <!-- <v-row class="form-item my-3" justify="center">
      <c-btn
        block
        size="large"
        class="text-none button-item font-weight-black"
        variant="outlined"
        @target="onLoginByTouchID"
      >
        <template #prepend>
          <v-icon>
            <IconBiometric />
          </v-icon>
        </template>
        <span class="font-weight-medium">{{ $t('biometric.login') }}</span>
      </c-btn>
    </v-row> -->

    <v-row align="center" justify="center">
      <span class="text-none text-button">{{ $t('account.null') }}</span>
      <c-btn class="text-none font-weight-bold" size="x-small" variant="text" @click="toSignUp"
        >{{ $t('register.button') }}
      </c-btn>
    </v-row>
  </v-form>

  <!--使用邮箱登录-->
  <AppLoginByAccount
    v-model="cs.showDialog"
    :img="cs.img"
    @close="cs.showDialog = false"
    @refresh="codeImage"
    @save="loginByAccountHandler"
  />
</template>

<style lang="scss" scoped>
.button-item {
  border-left: none;
  border-right: none;
  border-radius: 0;
}
</style>
