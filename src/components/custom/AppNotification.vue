<!--
  AppNotification
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
  <!-- <v-dialog
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
  </v-dialog> -->

  <v-snackbar
    v-for="(iterator, index) in cs.messageList"
    :key="index"
    v-model="iterator.show"
    :type="iterator.type"
    :timeout="cs.messageList[0]?.delay"
    location="top"
    :style="{ top: index * 60 + 'px' }"
  >
    {{ index + 1 + '、' + iterator.message }}
    <template v-slot:actions>
      <v-btn color="blue" variant="text" @click="iterator.show = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<style lang="scss" scoped></style>
