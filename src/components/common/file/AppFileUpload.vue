<!--
  AppFileUpload
  @author 谭期元
  @date  2023/09/27
  @description “文件上传”组件
-->
<script lang="ts" setup>
import { reactive } from 'vue'
import { fileUtils } from '@/utils/functions'
import { useAppStore } from '@/stores'

const appStore = useAppStore()

const cs = reactive({
  dialog: {
    show: false
  }
})

const data = reactive({
  fileList: []
})
</script>

<template>
  <v-btn icon @click="cs.dialog.show = true">
    <v-icon>mdi-cloud-upload</v-icon>
    <v-dialog
      v-model="cs.dialog.show"
      :fullscreen="appStore.app.settings['uploadDialogFullscreen']"
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="cs.dialog.show = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>文件上传</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn variant="text" @click="cs.dialog.show = false"> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list lines="two" subheader>
          <v-list-subheader>User Controls</v-list-subheader>
          <v-list-item
            title="Content filtering"
            subtitle="Set the content filtering level to restrict apps that can be downloaded"
          ></v-list-item>
          <v-list-item
            title="Password"
            subtitle="Require password for purchase or use password to restrict purchase"
          ></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list lines="two" subheader>
          <v-list-subheader>General</v-list-subheader>
          <v-list-item
            title="Notifications"
            subtitle="Notify me about updates to apps or games that I downloaded"
          >
            <template v-slot:prepend>
              <v-checkbox v-model="notifications"></v-checkbox>
            </template>
          </v-list-item>
          <v-list-item
            title="Sound"
            subtitle="Auto-update apps at any time. Data charges may apply"
          >
            <template v-slot:prepend>
              <v-checkbox v-model="sound"></v-checkbox>
            </template>
          </v-list-item>
          <v-list-item title="Auto-add widgets" subtitle="Automatically add home screen widgets">
            <template v-slot:prepend>
              <v-checkbox v-model="widgets"></v-checkbox>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-btn>

  <!-- <v-file-input label="File input" variant="underlined"></v-file-input> -->
</template>

<style lang="scss" scoped></style>
