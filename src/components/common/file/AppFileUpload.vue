<!--
  AppFileUpload
  @author 谭期元
  @date  2023/09/27
  @description “文件上传”组件
-->
<script lang="ts" setup>
// @ts-nocheck
import { computed, reactive, ref } from 'vue'
import { fileUtils } from '@/utils/functions'
import { useAppStore, useFileStore } from '@/stores'
import { AppFileDeleteConfirm } from '.'
import { useI18n } from 'vue-i18n'

const fileInputRef = ref<HTMLInputElement>()

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
  handleUpload(Object.values(fileObject))
}

/**
 * 选择上传
 * @param event 选择事件
 */
const handleFileSelect = (event: any) => {
  event.preventDefault()
  const fileObject = event.target.files as {}
  handleUpload(Object.values(fileObject))
}

/**
 * 上传事件
 * @param fileList 文件列表
 */
const handleUpload = async (fileList: Array<File>, reupload: boolean = false) => {
  if (appStore.app.settings['uploadAutoHideUploadArea']) {
    appStore.app.menuIndex['currentFileUploadOpenTab'] = []
    handleExpansion(null, reupload)
  }
  if ((await fileUtils.upload(fileList)) && appStore.app.settings['uploadDialogAutoClose']) {
    const allUploadCompleted = fileStore.uploadQueue.all.every(
      (item) => item.status === 'success' || item.status === 'error'
    )
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
        <v-expansion-panel value="upload-area">
          <template #title>
            {{ $t('file.upload.subtitle.text') }}
            <v-list-subheader
              class="pl-5 text-gray"
              v-show="!appStore.app.menuIndex['currentFileUploadOpenTab'].length"
            >
              <v-row>
                <v-col cols="auto">
                  {{
                    $t('file.upload.totalFileSize', [
                      fileUtils.formatSize(
                        fileStore.uploadQueue.all
                          .map((item) => item.file.size)
                          .reduce((prev, curr) => prev + curr, 0)
                      )
                    ])
                  }}
                </v-col>
                <v-col cols="auto">
                  {{ $t('file.upload.totalFileNumber', [fileStore.uploadQueue.all.length]) }}</v-col
                >
                <v-col cols="auto">{{
                  $t('file.upload.successNumber', [
                    fileStore.uploadQueue.all.filter((item) => item.status === 'success').length
                  ])
                }}</v-col>
                <v-col cols="auto">{{
                  $t('file.upload.errorNumber', [
                    fileStore.uploadQueue.all.filter((item) => item.status === 'error').length
                  ])
                }}</v-col>
                <v-col cols="auto">{{
                  $t('file.upload.cancelNumber', [
                    fileStore.uploadQueue.all.filter((item) => item.status === 'cancel').length
                  ])
                }}</v-col>
                <v-col cols="auto">{{
                  $t('file.upload.maxUploadCount.text', [appStore.app.settings['maxUploadCount']])
                }}</v-col>
                <v-col cols="auto">{{
                  $t('file.upload.currentWorkerCount.text', [
                    fileStore.uploadQueue.all.reduce(
                      (sum, item) => sum + (item.workerCount || 0),
                      0
                    )
                  ])
                }}</v-col>
              </v-row>
            </v-list-subheader>
          </template>
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
            <!-- {{ fileStore.uploadList?.map((item, index) => ({ ...item, no: index + 1 })) }} -->
          </template>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-divider></v-divider>
      <v-list lines="two" subheader>
        <!-- <v-list-subheader class="w-100"> 上传列表 </v-list-subheader> -->

        <v-list-item>
          <!-- {{ fileStore.uploadList? }} -->
          <!-- {{ fileStore.uploadQueue }} -->
          <v-data-table-virtual
            :headers="data.table.headers"
            :items="fileStore.uploadQueue.all"
            class="elevation-1"
            :height="cs.tableHeight"
            fixed-header
            item-value="name"
            density="compact"
          >
            <template v-slot:item.index="{ item }">
              {{ item.index }}
            </template>
            <template v-slot:item.file.name="{ item }">
              <v-chip variant="text" size="x-large" style="position: relative; right: 15px">
                <div class="text-truncate" style="width: 25vw">
                  <v-icon
                    :icon="`mdi-` + item.icon"
                    size="30"
                    class="mr-2"
                    color="#62B1FA"
                  ></v-icon>
                  <span style="position: relative; top: 2px">{{ item.file.name }}</span>
                </div>
              </v-chip>
            </template>
            <template v-slot:item.fileSize="{ item }">
              {{ fileUtils.formatSize(item.file.size) }}
            </template>
            <template v-slot:item.power="{ item }">
              <v-progress-linear
                :model-value="item.power"
                height="12"
                :indeterminate="item.status === 'init' && item.power <= 0"
                rounded
              >
                <strong class="text-white text-overline">{{
                  item.status === 'cancel'
                    ? $t('cancel.text')
                    : item.status === 'error'
                    ? $t('error.text')
                    : item.status === 'success'
                    ? $t('success.text')
                    : Math.ceil(item.power) + '%'
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
                    :disabled="
                      item.status !== 'uploading' &&
                      item.status !== 'await' &&
                      item.status !== 'init'
                    "
                    @click="() => item.cancelUpload()"
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
                    :disabled="!(item.status === 'cancel' || item.status === 'error')"
                    v-bind="props"
                    size="x-small"
                    color="info"
                    icon="mdi-restart"
                    class="mr-1"
                    @click="item.reupload()"
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
                    <AppFileDeleteConfirm :item="item" />
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
