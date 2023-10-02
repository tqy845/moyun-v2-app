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
import { AppFileDeleteConfirm } from '.'
import { ACTION_TYPE } from '@/types/enums'
import { useI18n } from 'vue-i18n'

const fileInputRef = ref<HTMLInputElement>()
const tableRef = ref()

const { t } = useI18n()
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
  tableHeight: number
}>({
  dialog: {
    show: false
  },
  tableHeight: appStore.app.menuIndex['currentFileUploadOpenTab'].includes('upload-area')
    ? 150
    : 370
})

const data = reactive({
  table: {
    statistics: {} as { [key: string]: any },
    headers: [
      { title: 'No', align: 'start', sortable: true, key: 'index', width: 100 },
      {
        title: t('file.upload.uploadList.fileName.text'),
        sortable: true,
        key: 'file.name',
        align: 'center',
        width: 'auto'
      },
      {
        title: t('file.upload.uploadList.fileSize.text'),
        sortable: true,
        key: 'fileSize',
        align: 'center',
        width: 100
      },
      {
        title: t('file.upload.uploadList.fileProgress.text'),
        sortable: true,
        key: 'power',
        align: 'center',
        width: 300
      },
      {
        title: t('file.upload.uploadList.fileAction.text'),
        sortable: false,
        key: 'action',
        align: 'center',
        width: 150
      }
    ]
  }
})

const _show = computed(() => props.show)

/**
 * 展开/收起上传区域
 */
const handleExpansion = (event: any, reupload: boolean) => {
  // console.log(cs.upload.length, reupload)
  if (reupload) {
    cs.tableHeight = 370
  } else if (!appStore.app.menuIndex['currentFileUploadOpenTab'].includes('upload-area')) {
    cs.tableHeight = 370
  } else if (appStore.app.menuIndex['currentFileUploadOpenTab'].includes('upload-area')) {
    cs.tableHeight = 150
  }
  // cs.tableHeight = tableRef.value.height === 150 ? 370 : 150
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
  handleUpload(Object.values(fileObject).map((item) => ({ file: item as File })))
}

/**
 * 上传事件
 * @param fileList 文件列表
 */
const handleUpload = async (fileList: Array<UploadChunk>, reupload: boolean = false) => {
  if (appStore.app.settings['uploadAutoHideUploadArea']) {
    appStore.app.menuIndex['currentFileUploadOpenTab'] = []
    handleExpansion(null, reupload)
  }
  if ((await fileUtils.upload(fileList)) && appStore.app.settings['uploadDialogAutoClose']) {
    const allUploadCompleted = fileStore.fileUploadList.every((item) => item.status !== 'uploading')
    if (allUploadCompleted) emits('update:show', false)
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
  appStore.requestQueue[item.file.name].forEach((it) => {
    it.abort()
  })
  delete appStore.requestQueue[item.file.name]
}

/**
 * 重新上传
 */
const handleReUpload = async (item: UploadChunk) => {
  console.log('重新上传', item)
  item.status = 're-upload'
  handleUpload([item], true)
}

/**
 * 删除文件
 * @param selected 是否删除
 * @param item 文件
 */
const handleDeleteSelect = async (selected: number, item: UploadChunk) => {
  console.log('用户选择', selected, item)
  if (selected === ACTION_TYPE.CONFIRM) {
    item.deleting = true
    const _file = fileStore.find(item.file.name)
    if (_file?.name) {
      await _file.delete()
    }
    item.deleting = false
  }
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
        <v-tooltip :text="$t('file.upload.uploadList.dialog.hideButton.text')" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" class="ml-3" icon dark @click="emits('update:show', false)">
              <v-icon>mdi-eye-off</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </v-toolbar>

      <v-expansion-panels
        multiple
        v-model="appStore.app.menuIndex['currentFileUploadOpenTab']"
        @update:modelValue="handleExpansion($event, false)"
      >
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
            <!-- {{ fileStore.fileUploadList.map((item, index) => ({ ...item, no: index + 1 })) }} -->
          </template>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-divider></v-divider>
      <v-list lines="two" subheader>
        <!-- <v-list-subheader class="w-100"> 上传列表 </v-list-subheader> -->
        <v-list-subheader>
          <v-row>
            <v-col cols="auto" class="text-primary">
              {{ $t('file.upload.totalFileNumber', [fileStore.fileUploadList.length]) }}</v-col
            >
            <v-col cols="auto" class="text-primary">
              {{
                $t('file.upload.totalFileSize', [
                  fileUtils.formatSize(
                    fileStore.fileUploadList
                      .map((item) => item.file.size)
                      .reduce((prev, curr) => prev + curr, 0)
                  )
                ])
              }}
            </v-col>
            <v-col cols="auto" class="text-primary">{{
              $t('file.upload.successNumber', [
                fileStore.fileUploadList.filter((item) => item.status === 'success').length
              ])
            }}</v-col>
            <v-col cols="auto" class="text-primary">{{
              $t('file.upload.errorNumber', [
                fileStore.fileUploadList.filter((item) => item.status === 'error').length
              ])
            }}</v-col>
            <v-col cols="auto" class="text-primary">{{
              $t('file.upload.cancelNumber', [
                fileStore.fileUploadList.filter((item) => item.status === 'cancel').length
              ])
            }}</v-col>
          </v-row>
        </v-list-subheader>
        <v-list-item>
          <v-data-table-virtual
            :headers="data.table.headers"
            :items="fileStore.fileUploadList"
            class="elevation-1"
            :height="cs.tableHeight"
            fixed-header
            item-value="name"
            density="compact"
          >
            <template v-slot:item.index="{ item }">
              {{ item.index }}
            </template>
            <template v-slot:item.fileSize="{ item }">
              {{ fileUtils.formatSize(item.file.size) }}
            </template>
            <template v-slot:item.power="{ item }">
              <v-progress-linear
                :buffer-value="item.power"
                :model-value="item.power"
                height="12"
                :indeterminate="item.status === 'init'"
                rounded
              >
                <strong class="text-white text-overline">{{
                  item.status === 'cancel'
                    ? $t('cancel.text')
                    : item.uploadStatus?.error
                    ? $t('error.text')
                    : typeof item.power === 'number'
                    ? Math.ceil(item.power) + '%'
                    : item.power
                }}</strong></v-progress-linear
              >
            </template>
            <template v-slot:item.action="{ item }">
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
                    :disabled="item.status !== 'uploading'"
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
                    :disabled="!item.uploadStatus?.error || item.deleting"
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
                  <span v-bind="props">
                    <AppFileDeleteConfirm :item="item" @select="handleDeleteSelect($event, item)" />
                  </span>
                </template>
              </v-tooltip>
            </template>
          </v-data-table-virtual>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
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
