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
import { BasicFile, UploadChunk } from '@/types/models'

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
  handleUpload(Object.values(fileObject).map((item) => ({ file: item as File })))
}

/**
 * 选择上传
 * @param event 选择事件
 */
const handleFileSelect = (event: any) => {
  event.preventDefault()
  const fileObject = event.target.files as {}
  console.log('fileObject = ', fileObject)
  handleUpload(Object.values(fileObject).map((item) => ({ file: item as File })))
}

/**
 * 上传事件
 * @param fileList 文件列表
 */
const handleUpload = async (fileList: Array<UploadChunk>) => {
  if (appStore.app.settings['uploadAutoHideUploadArea']) {
    cs.upload = []
    handleExpansion()
  }
  if ((await fileUtils.upload(fileList)) && appStore.app.settings['uploadDialogAutoClose']) {
    emits('update:show', false)
  }
}

/**
 * 单击上传区域单击事件
 */
const handleClickArea = () => {
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
    fileInputRef.value.click()
  }
}

/**
 * 取消下载
 * @param item UploadChunk 文件
 */
const handleCancel = (item: UploadChunk) => {
  console.log('取消下载', item)
  fileStore.fileUploadList = fileStore.fileUploadList.filter(
    (it) => it.file.name !== item.file.name
  )
}

/**
 * 重新上传
 */
const handleReUpload = async (item: UploadChunk) => {
  console.log('重新上传', item)
  item.status = 're-upload'
  await fileUtils.upload([item])
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
        <v-toolbar-title>{{ $t('file.upload.title.text') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-row style="width: max-content" justify="end">
          <v-col cols="auto">
            <v-switch
              v-model="appStore.app.settings['uploadAutoHideUploadArea']"
              color="success"
              :value="true"
              hide-details
              inset
            >
              <template v-slot:label> {{ $t('file.upload.autoHideUploadArea') }} </template>
            </v-switch>
          </v-col>
          <v-col cols="auto">
            <v-switch
              v-model="appStore.app.settings['uploadDialogAutoClose']"
              color="success"
              :value="true"
              hide-details
              inset
            >
              <template v-slot:label> {{ $t('file.upload.autoCloseDialog') }} </template>
            </v-switch>
          </v-col>
        </v-row>
        <v-btn class="ml-3" icon dark @click="emits('update:show', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-expansion-panels multiple v-model="cs.upload" @update:modelValue="handleExpansion">
        <v-expansion-panel :title="$t('file.upload.subtitle.text')" value="upload-area">
          <template #text>
            <div class="file-upload py-3">
              <div
                class="file-drop-area pa-12"
                @dragover.prevent
                @dragenter.prevent
                @dragleave.prevent
                @drop.stop="handleFileDrop"
                @click.stop="handleClickArea"
              >
                <v-icon size="56">mdi-cloud-upload</v-icon>
                <p>
                  <em>{{ $t('file.upload.area.text') }}</em>
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
            <!-- <v-list lines="two" subheader>
              <v-list-item
                title="注意：单个文件大小不能超过100GB"
                subtitle="支持分片上传、断点续传、秒传、加密上传等"
              ></v-list-item>
            </v-list> -->
          </template>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-divider></v-divider>
      <v-list lines="two" subheader>
        <!-- <v-list-subheader class="w-100"> 上传列表 </v-list-subheader> -->
        <v-list-item>
          <v-table ref="tableRef" density="compact" :height="cs.tableHeight" fixed-header>
            <thead>
              <tr>
                <th class="text-left">No</th>
                <th class="text-left">{{ $t('file.upload.uploadList.fileName.text') }}</th>
                <th class="text-left">{{ $t('file.upload.uploadList.fileSize.text') }}</th>
                <th class="text-left">{{ $t('file.upload.uploadList.fileProgress.text') }}</th>
                <th class="text-left">{{ $t('file.upload.uploadList.fileAction.text') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in fileStore.fileUploadList"
                :key="index"
                :class="[item.file.name]"
              >
                <td>{{ index + 1 }}</td>
                <td>
                  {{ item.file.name }}
                  {{ item.uploadStatus }}
                </td>
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
                      item.uploadStatus?.error
                        ? '失败'
                        : typeof item.power === 'number'
                        ? Math.ceil(item.power) + '%'
                        : item.power
                    }}</strong></v-progress-linear
                  >
                </td>
                <td width="150">
                  <!-- 取消上传 -->
                  <v-tooltip
                    :text="$t('file.upload.uploadList.fileAction.cancel.text')"
                    location="bottom"
                  >
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

                  <!-- 重新上传 -->
                  <v-tooltip
                    :text="$t('file.upload.uploadList.fileAction.reupload.text')"
                    location="bottom"
                  >
                    <template v-slot:activator="{ props }">
                      <v-btn
                        :disabled="!item.uploadStatus?.error"
                        v-bind="props"
                        size="x-small"
                        color="info"
                        icon="mdi-restart"
                        class="mr-1"
                        @click="handleReUpload(item)"
                      ></v-btn>
                    </template>
                  </v-tooltip>

                  <!-- 删除 -->
                  <v-tooltip
                    :text="$t('file.upload.uploadList.fileAction.remove.text')"
                    location="bottom"
                  >
                    <template v-slot:activator="{ props }">
                      <v-btn
                        v-bind="props"
                        size="x-small"
                        color="error"
                        icon="mdi-delete"
                        class="mr-1"
                        :disabled="item.status !== 'success'"
                        @click="handleCancel(item)"
                      ></v-btn>
                    </template>
                  </v-tooltip>
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
