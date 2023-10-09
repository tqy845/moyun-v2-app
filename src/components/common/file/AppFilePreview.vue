<!--
  AppFilePreview
  @author 谭期元
  @date  2023/10/10
  @description “文件预览”组件
-->

<script lang="ts" setup>
import { useFileStore } from '@/stores'

const fileStore = useFileStore()
</script>

<template>
  <v-dialog v-model="fileStore.preview" persistent width="700">
    <v-card>
      <!-- <v-card-title>
        <span class="text-h5">
          {{ fileStore.selectedList[0] }}
        </span>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="fileStore.preview = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title> -->
      <v-toolbar color="primary">
        <span class="pl-5"
          ><v-icon class="pr-3">mdi-file-eye</v-icon> {{ fileStore.selectedList[0] }}</span
        >
        <v-spacer></v-spacer>
        <v-btn icon dark @click="fileStore.preview = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-item>
        <v-img cover src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
      </v-card-item>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped></style>
