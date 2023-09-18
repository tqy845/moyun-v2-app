<!--
  AppIconView
  @author 谭期元
  @date  2023/09/19
  @description “图标视图”组件
-->

<script lang="ts" setup>
import { computed } from 'vue'
import { File } from '@/types/models'
import { AppFile } from '@/components/common'

const emits = defineEmits(['doubleClick', 'rightClick'])

const props = defineProps<{
  width: number
  data: {
    fileList: Array<File>
    selected: number | Array<number>
  }
  multiple: boolean
}>()

const data = computed(() => props.data)
</script>

<template>
  <div v-if="width" :style="{ 'padding-left': `${((width - 32) % 158) / 2 + 15}px` }">
    <v-btn-toggle v-model="data.selected" :density="null" :multiple="multiple" class="pa-5">
      <v-row>
        <v-col v-for="(iterator, index) in data.fileList" :key="index" class="px-1" cols="auto">
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
