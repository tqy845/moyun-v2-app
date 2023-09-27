<!--
  AppFileUpload
  @author 谭期元
  @date  2023/09/27
  @description “文件上传”组件
-->
<script lang="ts" setup>
import { reactive } from 'vue'

const cs = reactive({
  dialog: {
    show: false
  }
})

const data = reactive({
  fileList: []
})

const handleUpload = (file: any) => {
  console.log('handleUpload', file)
}
</script>

<template>
  <v-btn icon>
    <v-icon>mdi-cloud-upload</v-icon>
    <v-dialog v-model="cs.dialog.show" activator="parent" width="auto">
      <v-card min-width="500" min-height="400" max-width="800" max-height="600">
        <v-card-title> 文件上传 </v-card-title>
        <v-card-item class="pa-5">
          <!-- <v-file-input show-size counter multiple label="点击或拖住文件到此处"></v-file-input> -->
          <v-file-input
            class="ma-5"
            v-model="data.fileList"
            color="deep-purple-accent-4"
            counter
            label="File input"
            multiple
            placeholder="请选择文件"
            prepend-icon="mdi-paperclip"
            variant="outlined"
            :show-size="1000"
            @update:modelValue="handleUpload"
          >
            <template v-slot:selection="{ fileNames }">
              <template v-for="(fileName, index) in fileNames" :key="fileName">
                <v-chip
                  v-if="index < 2"
                  color="deep-purple-accent-4"
                  label
                  size="small"
                  class="me-2"
                >
                  {{ fileName }}
                </v-chip>

                <span v-else-if="index === 2" class="text-overline text-grey-darken-3 mx-2">
                  +{{ data.fileList.length - 2 }} File(s)
                </span>
              </template>
            </template>
          </v-file-input>
        </v-card-item>
        <!-- <v-card-text> 点击或拖拽文件到此处 </v-card-text> -->
      </v-card>
    </v-dialog>
  </v-btn>

  <!-- <v-file-input label="File input" variant="underlined"></v-file-input> -->
</template>

<style lang="scss" scoped></style>
