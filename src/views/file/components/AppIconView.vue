<!--
  AppIconView
  @author 谭期元
  @date  2023/09/19
  @description “图标视图”组件
-->

<script lang="ts" setup>
import { computed, watch } from 'vue'
import { File } from '@/types/models'
import { AppFile, AppFileUpload } from '@/components/common'
import { useMagicKeys } from '@vueuse/core'
import { reactive } from 'vue'
import { useFileStore } from '@/stores'
import { fileUtils } from '@/utils/functions'

const fileStore = useFileStore()

const emits = defineEmits(['doubleClick', 'rightClick'])

const props = defineProps<{
  width: number
  selected: number | Array<number>
  multiple: boolean
}>()

const selected = computed(() => props.selected)

window.addEventListener('wheel', fileUtils.iconViewMouseWheel)
</script>

<template>
  <div v-if="width" :style="{ 'padding-left': `${((width - 32) % 158) / 2 + 15}px` }">
    <v-alert
      v-if="!fileStore.fileList.length"
      density="compact"
      variant="outlined"
      type="warning"
      prominent
      border="top"
      title="没有文件"
    >
      <template #text>
        <p class="pa-1">
          点击
          <AppFileUpload size="x-small" />
          按钮即刻开始上传文件，上传的文件会展示在这里。
        </p>
      </template>
    </v-alert>

    <v-icon end icon="mdi-empty"></v-icon>
    <v-btn-toggle v-model="selected" :density="null" :multiple="multiple" class="pa-5">
      <v-row>
        <v-col
          v-for="(iterator, index) in fileStore.fileList"
          :key="index"
          class="px-1"
          cols="auto"
        >
          <!-- 渲染文件-->
          <AppFile
            :file-item="iterator"
            elevation="0"
            style="background-color: rgba(0, 0, 0, 0)"
            @dblclick="emits('doubleClick', iterator)"
            @contextmenu.stop="emits('rightClick', $event, iterator)"
          />
        </v-col>
      </v-row>
    </v-btn-toggle>
  </div>
</template>

<style lang="scss" scoped></style>
