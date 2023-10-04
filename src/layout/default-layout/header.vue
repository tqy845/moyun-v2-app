<!--
  AppHeaderBar
  @author 谭期元
  @date  2023/09/15
  @description “上边菜单栏”组件
-->
<script lang="ts" setup>
import { AppLanguage, AppFileView, AppFileSearch, AppFileUpload } from '@/components/common'
import { reactive, computed } from 'vue'
import { BasicFile } from '@/types/models'
import { AppFile } from '@/components/common'
import { createSharedComposable, useMagicKeys, useWindowSize } from '@vueuse/core'
import { useAppStore, useFileStore } from '@/stores'
import { fileUtils } from '@/utils/functions'
import { FileType } from '@/types/enums'

const fileStore = useFileStore()
const appStore = useAppStore()

const props = defineProps({
  breadcrumbItems: {
    type: Array<{
      title: String
      disabled: Boolean
      href: String
    }>,
    default: () => []
  }
})

const cs = reactive({
  fileUpload: {
    show: false,
    init: false
  }
})

const data = reactive<{
  tabItems: Array<{ label: string; icon: string; key: string }>
  tabMoreItems: Array<{ label: string; icon: string; key: string }>
}>({
  tabItems: [
    {
      label: 'file.view.iconLabel.secondaryMenu.all.text',
      icon: 'file',
      key: FileType.All
    },
    {
      label: 'file.view.iconLabel.secondaryMenu.document.text',
      icon: 'briefcase',
      key: FileType.Document
    },
    {
      label: 'file.view.iconLabel.secondaryMenu.multimedia.text',
      icon: 'multimedia',
      key: FileType.Media
    }
  ],
  tabMoreItems: [
    {
      label: 'file.view.iconLabel.secondaryMenu.folder.text',
      icon: 'folder',
      key: FileType.Folder
    },
    {
      label: 'file.view.iconLabel.secondaryMenu.package.text',
      icon: 'folder-zip',
      key: FileType.Zip
    },
    {
      label: 'file.view.iconLabel.secondaryMenu.gho.text',
      icon: 'disc',
      key: FileType.Ghost
    },
    {
      label: 'file.view.iconLabel.secondaryMenu.application.text',
      icon: 'application',
      key: FileType.Application
    }
  ]
})

/**
 * 切换标签
 * @param item 标签项
 */
const handleChangeTab = (item: unknown) => {
  console.log('切换标签', item)
  const _item = item as {
    label: string
    icon: string
    key: string
    index: number
  }
  appStore.app.menuIndex['currentFileClassifyTab'] = _item
  if (!fileStore.classifyTabCurrentPage[_item.key]) {
    fileStore.classifyTabCurrentPage[_item.key] = 1
  }
  fileStore.paging(fileStore.classifyTabCurrentPage[_item.key] ?? 1)
}

const fileUploading = computed(() => {
  const success = fileStore.uploadQueue.all.filter(
    (item) => item.status === 'success' || item.status === 'error' || item.status === 'cancel'
  )
  const calc = (success.length / fileStore.uploadQueue.all.length) * 100
  return calc >= 100 ? 0 : calc
})
</script>

<template>
  <v-app-bar color="teal-darken-4">
    <template v-slot:image>
      <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
    </template>

    <!-- 文件分类 -->
    <v-tabs
      v-show="!fileStore.search && appStore.app.menuIndex['currentSecondMenuTab']['id']"
      v-model="appStore.app.menuIndex['currentFileClassifyTab']['index']"
      centered
      stacked
      show-arrows
      color="yellow-darken-1"
      @update:modelValue="handleChangeTab"
    >
      <v-tab
        class="text-capitalize"
        v-for="(item, index) in data.tabItems"
        :key="index"
        :value="{ ...item, index }"
      >
        <v-icon size="24">mdi-{{ item.icon }}</v-icon> {{ $t(item.label) }}
      </v-tab>

      <!-- 更多分类 variant="tonal" -->
      <v-menu v-if="data.tabMoreItems.length">
        <template v-slot:activator="{ props }">
          <v-btn rounded="0" class="text-capitalize" height="100%" v-bind="props">
            <v-row class="d-flex flex-column">
              <v-col cols="auto" class="pa-0 ma-0"
                ><v-icon size="24">mdi-dots-horizontal-circle</v-icon>
              </v-col>
              <v-col cols="auto" class="pa-0 ma-0">
                {{ $t('file.view.iconLabel.secondaryMenu.more.text') }}
              </v-col>
            </v-row>
          </v-btn>
        </template>

        <v-list class="bg-grey-lighten-3" density="compact" nav>
          <v-list-item
            v-for="(item, index) in data.tabMoreItems"
            :key="index"
            @click="handleChangeTab({ ...item, index: data.tabItems.length + index })"
            :value="item.key"
          >
            <template v-slot:prepend>
              <v-icon>mdi-{{ item.icon }}</v-icon>
            </template>
            {{ $t(item.label) }}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-tabs>

    <!-- 面包屑 -->
    <!-- <v-app-bar-title>
      <v-breadcrumbs v-bind="$attrs"></v-breadcrumbs>
    </v-app-bar-title> -->

    <!-- 右侧分栏 -->
    <v-spacer></v-spacer>

    <!-- 文件搜索 -->
    <AppFileSearch />

    <!-- 文件上传 -->
    <AppFileUpload
      :show="cs.fileUpload.show"
      @update:show="(show) => (cs.fileUpload.show = show)"
    />

    <!-- {{ fileUploading }} -->
    <v-progress-circular
      v-if="!isNaN(fileUploading) && fileUploading > 0"
      :width="3.5"
      :size="44"
      :model-value="fileUploading"
      color="yellow-darken-1"
    >
      <v-btn icon="mdi-cloud-upload" @click="cs.fileUpload.show = true"> </v-btn>
    </v-progress-circular>
    <v-btn v-else icon="mdi-cloud-upload" @click="cs.fileUpload.show = true"> </v-btn>

    <!-- 视图切换 -->
    <AppFileView />

    <!-- I18n 语言切换 -->
    <AppLanguage />
  </v-app-bar>
</template>

<style lang="scss" scoped></style>
