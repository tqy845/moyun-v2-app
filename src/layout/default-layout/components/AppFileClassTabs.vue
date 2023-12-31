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
import { useI18n } from 'vue-i18n'

const fileStore = useFileStore()
const appStore = useAppStore()

const data = reactive<{
  tabItems: Array<{ label: string; icon: string; key: string }>
  tabMoreItems: Array<{ label: string; icon: string; key: string }>
}>({
  tabItems: fileStore.showClassMenuItems,
  tabMoreItems: fileStore.classMenuItems.filter(
    (item) => !fileStore.showClassMenuItems.map((item) => item.key).includes(item.key)
  )
})

/**
 * 切换标签
 * @param item 标签项
 */
const handleChangeTab = (item: unknown) => {
  // console.log('切换标签', item)
  const key = item as string
  appStore.app.menuIndex['currentFileClassifyTab'] = key
  if (!fileStore.classifyTabCurrentPage[key]) {
    // 当前页
    fileStore.classifyTabCurrentPage[key] = 1
  }
  fileStore.paging(fileStore.classifyTabCurrentPage[key])
}
</script>

<template>
  <!-- 文件分类 -->
  <v-tabs
    v-show="
      !fileStore.search && !appStore.search && appStore.app.menuIndex['currentSecondMenuTab'].length
    "
    :model-value="appStore.app.menuIndex['currentFileClassifyTab']"
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
      :value="item.key"
    >
      <v-icon size="24">mdi-{{ item.icon }}</v-icon> {{ $t(item.label) }}
    </v-tab>

    <!-- 更多分类  -->
    <v-menu v-if="data.tabMoreItems.length">
      <template v-slot:activator="{ props }">
        <v-btn
          :variant="
            ![FileType.All, FileType.Document, FileType.Media].includes(
              appStore.app.menuIndex['currentFileClassifyTab']
            )
              ? 'tonal'
              : 'text'
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
          @click="handleChangeTab(item.key)"
          :value="item.key"
          :active="appStore.app.menuIndex['currentFileClassifyTab'] === item.key"
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
