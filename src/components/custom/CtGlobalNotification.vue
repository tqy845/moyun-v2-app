<!--
  CtGlobalNotification
  @author 谭期元
  @date  2023/08/13
  @description “全局”消息组件
-->
<script lang="ts" setup>
import { reactive } from 'vue'
import { useAppStore } from '@/stores'

const appStore = useAppStore()

const cs = reactive<{ showDialog: boolean; messageList: Array<any> }>({
  showDialog: true,
  messageList: []
})

appStore.$subscribe((_, state) => {
  if (state.messageQueue.length) {
    cs.showDialog = true
    cs.messageList.push(...state.messageQueue.copyWithin(0, state.messageQueue.length))
    state.messageQueue.length = 0

    setTimeout(() => {
      cs.messageList.shift()
      if (!cs.messageList) {
        cs.showDialog = false
      }
    }, cs.messageList[0]?.delay || 3000)
  }
})
</script>

<template>
  <v-dialog
    v-model="cs.showDialog"
    :no-click-animation="false"
    :persistent="true"
    :scrim="false"
    style="justify-content: end; align-items: start"
    transition="dialog-top-transition"
    width="auto"
  >
    <v-alert
      v-for="(iterator, index) in cs.messageList"
      :key="index"
      v-model="iterator.show"
      :text="iterator.message"
      :title="iterator?.title"
      :type="iterator.type"
      class="mb-5"
      closable
      max-width="500"
      @click:close="iterator.show = false"
    ></v-alert>
  </v-dialog>
</template>

<style lang="scss" scoped></style>
