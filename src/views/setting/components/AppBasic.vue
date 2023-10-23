<!--
  AppBasic
  @author 谭期元
  @date  2023/10/23
  @description “通用配置”组件
-->
<script lang="ts" setup>
import { useAppStore } from '@/stores'
import { reactive } from 'vue'

const appStore = useAppStore()

const data = reactive({
  tab: null
})
</script>

<template>
  <v-card class="">
    <v-tabs v-model="data.tab" align-tabs="end">
      <v-tab :value="1">应用程序</v-tab>
      <v-tab :value="2">City</v-tab>
      <v-tab :value="3">Abstract</v-tab>
    </v-tabs>
    <v-window v-model="data.tab">
      <v-window-item v-for="n in 3" :key="n" :value="n">
        <v-container fluid>
          <v-row>
            <v-col v-for="i in 6" :key="i" cols="12" md="4">
              <v-img
                :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                aspect-ratio="1"
              ></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<style lang="scss" scoped></style>
