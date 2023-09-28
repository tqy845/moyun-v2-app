<!--
  AppFileUpload
  @author 谭期元
  @date  2023/09/27
  @description “文件上传”组件
-->
<script lang="ts" setup>
import { onUpdated, onMounted, reactive, ref } from 'vue'
import { fileUtils } from '@/utils/functions'
import { useAppStore } from '@/stores'

const fileInputRef = ref<HTMLInputElement>()

const appStore = useAppStore()

const cs = reactive({
  dialog: {
    show: false
  },
  upload: ['upload-area'],
  selected: []
})

const data = reactive<{
  fileList: Array<{ file: File; progress: number }>
}>({
  fileList: []
})

/**
 * 拖拽上传
 * @param event 拖拽事件
 */
const handleFileDrop = (event: any) => {
  event.preventDefault()
  const fileList = event.dataTransfer.files as Array<File>
  fileList.forEach((item) => {
    data.fileList.push({
      file: item,
      progress: 0
    })
  })
}

const updateProgress = (file) => {
  const min = 1
  const max = 5
  const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min
  file.progress += randomInteger
  console.log('进度', file.progress)

  // 如果文件尚未上传完成，继续更新进度
  if (file.progress < 100) {
    setTimeout(() => {
      updateProgress(file)
    }, randomInteger * 1000)
  }
}

/**
 * 选择上传
 * @param event 选择事件
 */
const handleFileSelect = (event: any) => {
  event.preventDefault()
  const fileList = event.target.files as Array<File>
  for (const iterator of fileList) {
    const _file = {
      file: iterator,
      progress: 0
    }

    // 启动进度更新
    updateProgress(_file)

    data.fileList.push(_file)
  }
}

const handleExpansion = (itemList: Array<string>) => {
  console.log(itemList)
  cs.selected = itemList
}
</script>

<template>
  <v-btn icon @click="cs.dialog.show = true">
    <v-icon>mdi-cloud-upload</v-icon>
    <v-dialog
      v-show="cs.dialog.show"
      v-model="cs.dialog.show"
      :fullscreen="appStore.app.settings['uploadDialogFullscreen']"
      :scrim="false"
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>文件上传</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="cs.dialog.show = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-expansion-panels multiple v-model="cs.upload" @update:modelValue="handleExpansion">
          <v-expansion-panel title="上传文件" value="upload-area">
            <template #text>
              <div class="file-upload px-3">
                <div
                  class="file-drop-area pa-12"
                  @dragover.prevent
                  @dragenter.prevent
                  @dragleave.prevent
                  @drop.stop="handleFileDrop"
                  @click.stop="fileInputRef?.click()"
                >
                  <v-icon size="56">mdi-cloud-upload</v-icon>
                  <p>
                    <em>拖拽文件到此处或点击上传</em>
                  </p>
                </div>
                <input
                  type="file"
                  ref="fileInputRef"
                  style="display: none"
                  multiple
                  @change="handleFileSelect"
                />
              </div>
            </template>
          </v-expansion-panel>
        </v-expansion-panels>
        <!-- <v-list lines="two" subheader v-show="cs.uploadArea">
          <v-list-subheader>上传文件</v-list-subheader>
          <v-list-item> </v-list-item>
          <v-list-item
            title="注意：上传的文件大小不能超过100GB"
            subtitle="支持分片上传、断点续传、秒传、加密上传等"
          ></v-list-item>
        </v-list>-->
        <v-divider></v-divider>
        <v-list lines="two" subheader>
          <v-list-subheader class="w-100"> 上传列表 </v-list-subheader>
          <v-list-item
            ><v-table density="compact" :height="cs.selected.length ? 150 : 370" fixed-header>
              <thead>
                <tr>
                  <th class="text-left">No</th>
                  <th class="text-left">文件名</th>
                  <th class="text-left">进度</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in data.fileList" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.file.name }}</td>
                  <td width="350">
                    <v-progress-linear
                      :model-value="item.progress"
                      :indeterminate="!item.progress"
                      height="10"
                    >
                      <strong class="text-white text-overline"
                        >{{ Math.ceil(item.progress) }}%</strong
                      ></v-progress-linear
                    >
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-btn>

  <!-- <v-file-input label="File input" variant="underlined"></v-file-input> -->
</template>

<style lang="scss" scoped>
.file-upload {
  text-align: center;

  .file-drop-area {
    border: 2px dashed #ccc;
    cursor: pointer;
    background-color: #f7f7f7;
    border-radius: 5px;

    p {
      margin: 0;
    }
  }

  button {
    margin-top: 10px;
  }
}
</style>
