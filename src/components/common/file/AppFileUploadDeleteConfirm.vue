<!--
  AppFileUploadDeleteConfirm
  @author 谭期元
  @date  2023/09/30
  @description “文件上传删除确认”组件
-->

<script lang="ts" setup>
import { reactive } from 'vue'
import { ACTION_TYPE, ActionType } from '@/types/enums'
import { UploadChunk } from '@/types/models'

const props = defineProps<{
  item: UploadChunk
}>()

const emits = defineEmits(['select'])

const cs = reactive({
  dialog: {
    show: false
  }
})

/**
 * 用户选择
 * @param item 用户的选择
 */
const handleSelect = (item: number) => {
  cs.dialog.show = false
  emits('select', item)
}
</script>

<template>
  <v-dialog v-model="cs.dialog.show" persistent width="auto">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        size="x-small"
        color="error"
        icon="mdi-delete"
        class="mr-1"
        :loading="item.deleting"
        :disabled="item.status === 'uploading' || item.status === 'init' || item.status === 'await'"
      ></v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5"> 删除确认 </v-card-title>
      <v-card-text>确定要删除【{{ item.file.name }}】吗？</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="text" @click="handleSelect(ACTION_TYPE.CANCEL)">
          取消
        </v-btn>
        <v-btn color="error" variant="text" @click="handleSelect(ACTION_TYPE.CONFIRM)">
          确定
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped></style>
