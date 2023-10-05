<!--
  AppFileTabs
  @author 谭期元
  @date  2023/10/05
  @description “文件分类”菜单
-->

<script lang="ts" setup>
import { useAppStore, useFileStore } from '@/stores'
import { FileType } from '@/types/enums'
import { reactive } from 'vue'

const fileStore = useFileStore()
const appStore = useAppStore()

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
      label: 'file.view.iconLabel.secondaryMenu.application.text',
      icon: 'application',
      key: FileType.Application
    },
    {
      label: 'file.view.iconLabel.secondaryMenu.gho.text',
      icon: 'ghost',
      key: FileType.Ghost
    },
    {
      label: 'file.view.iconLabel.secondaryMenu.folder.text',
      icon: 'folder',
      key: FileType.Folder
    },
    {
      label: 'file.view.iconLabel.secondaryMenu.package.text',
      icon: 'folder-zip',
      key: FileType.Zip
    }
  ]
})

/**
 * 切换标签
 * @param item 标签项
 */
const handleChangeTab = (item: unknown) => {
  // console.log('切换标签', item)
  const _item = item as {
    label: string
    icon: string
    key: string
    index: number
  }
  appStore.app.menuIndex['currentFileClassifyTab'] = _item
  if (!fileStore.classifyTabCurrentPage[_item.key]) {
    // 当前页
    fileStore.classifyTabCurrentPage[_item.key] = 1
  }
  fileStore.paging(fileStore.classifyTabCurrentPage[_item.key])
}
</script>

<template>
  <!-- 文件分类 -->
  <v-tabs
    v-show="!fileStore.search && appStore.app.menuIndex['currentSecondMenuTab']['id']"
    :model-value="appStore.app.menuIndex['currentFileClassifyTab']['index']"
    centered
    stacked
    show-arrows
    color="yellow-darken-1"
    @update:modelValue="handleChangeTab"
    :mandatory="false"
  >
    <v-tab
      class="text-capitalize"
      v-for="(item, index) in data.tabItems"
      :key="index"
      :value="{ ...item, index }"
    >
      <v-icon size="24">mdi-{{ item.icon }}</v-icon> {{ $t(item.label) }}
    </v-tab>

    <!-- 更多分类  -->
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          :variant="
            appStore.app.menuIndex['currentFileClassifyTab']['index'] > 2 ? 'tonal' : 'text'
          "
          rounded="0"
          class="text-capitalize"
          height="100%"
          v-bind="props"
        >
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
          @click="handleChangeTab({ ...item, index: 3 })"
          :value="item.key"
          :active="appStore.app.menuIndex['currentFileClassifyTab']['key'] === item.key"
        >
          <template v-slot:prepend>
            <v-icon>mdi-{{ item.icon }}</v-icon>
          </template>
          {{ $t(item.label) }}
        </v-list-item>
      </v-list>
    </v-menu>
  </v-tabs>
</template>

<style lang="scss" scoped></style>
