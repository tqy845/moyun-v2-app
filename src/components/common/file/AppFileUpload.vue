<!--
  AppFileUpload
  @author 谭期元
  @date  2023/09/27
  @description “文件上传”组件
-->
<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { fileUtils } from '@/utils/functions'
import { useAppStore, useFileStore } from '@/stores'
import { UploadChunk } from '@/types/models'

const fileInputRef = ref<HTMLInputElement>()
const tableRef = ref()

const appStore = useAppStore()
const fileStore = useFileStore()

const props = defineProps({
  show: {
    type: Boolean
  }
})

const emits = defineEmits(['update:show'])

const cs = reactive<{
  dialog: { show: boolean }
  upload: Array<string>
  tableHeight: number
}>({
  dialog: {
    show: false
  },
  upload: ['upload-area'],
  tableHeight: 150
})

const _show = computed(() => props.show)

/**
 * 展开/收起上传区域
 */
const handleExpansion = () => {
  cs.tableHeight = tableRef.value.height === 150 ? 370 : 150
}

/**
 * 拖拽上传
 * @param event 拖拽事件
 */
const handleFileDrop = (event: any) => {
  event.preventDefault()
  const fileObject = event.dataTransfer.files as {}
  fileUtils.upload(Object.values(fileObject))
  cs.upload = []
  handleExpansion()
}

/**
 * 选择上传
 * @param event 选择事件
 */
const handleFileSelect = (event: any) => {
  event.preventDefault()
  const fileObject = event.target.files as {}
  fileUtils.upload(Object.values(fileObject))
  cs.upload = []
  handleExpansion()
}

/**
 * 取消下载
 * @param item UploadChunk 文件
 */
const handleCancel = (item: UploadChunk) => {
  fileStore.fileUploadList = fileStore.fileUploadList.filter(
    (it) => it.file.name !== item.file.name
  )
}
</script>

<template>
  <v-dialog
    v-show="_show"
    v-model="_show"
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
          <v-btn icon dark @click="emits('update:show', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-expansion-panels multiple v-model="cs.upload" @update:modelValue="handleExpansion">
        <v-expansion-panel title="上传文件" value="upload-area">
          <template #text>
            <div class="file-upload py-3">
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
        <!-- <v-list-subheader class="w-100"> 上传列表 </v-list-subheader> -->
        <v-list-item>
          <v-table ref="tableRef" density="compact" :height="cs.tableHeight" fixed-header>
            <thead>
              <tr>
                <th class="text-left">No</th>
                <th class="text-left">文件名</th>
                <th class="text-left">大小</th>
                <th class="text-left">进度</th>
                <th class="text-left">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in fileStore.fileUploadList"
                :key="index"
                :class="[item.file.name]"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ item.file.name }}</td>
                <td>{{ fileUtils.formatSize(item.file.size) }}</td>
                <td style="min-width: 150px">
                  <v-progress-linear
                    :buffer-value="item.power"
                    :model-value="item.power"
                    height="12"
                    :indeterminate="item.status === 'init'"
                    rounded
                  >
                    <strong class="text-white text-overline">{{
                      typeof item.power === 'number' ? Math.ceil(item.power) + '%' : item.power
                    }}</strong></v-progress-linear
                  >
                </td>
                <td width="150">
                  <v-tooltip text="取消上传" location="bottom">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        v-bind="props"
                        size="x-small"
                        color="warning"
                        icon="mdi-upload-off"
                        class="mr-1"
                        :disabled="item.power === 100"
                        @click="handleCancel(item)"
                      ></v-btn>
                    </template>
                  </v-tooltip>
                  <!-- <v-tooltip text="移除记录" location="bottom">
                      <template v-slot:activator="{ props }">
                        <v-btn
                          v-bind="props"
                          size="x-small"
                          color="error"
                          icon="mdi-file-remove"
                          class="ml-1"
                        ></v-btn>
                      </template>
                    </v-tooltip> -->
                  <!-- <v-btn
                        size="small"
                        color="primary"
                        rounded="xl"
                        >取消</v-btn
                      >
                      <v-btn size="small" color="primary" rounded="xl" @click="handleCancel(item)"
                        >移除</v-btn
                      > -->
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>

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
