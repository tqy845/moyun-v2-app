<!--
  AppFileRename
  @author 谭期元
  @date  2023/10/28
  @description “文件重命名提示”组件
-->
<script lang="ts" setup>
import { useAppStore, useFileStore } from '@/stores'
import { MoYunFile } from '@/types/models'
import { message } from '@tauri-apps/api/dialog'
import { reactive } from 'vue'

const fileStore = useFileStore()
const appStore = useAppStore()

const props = defineProps({
  moYunFile: {
    type: MoYunFile,
    required: true
  }
})

const cs = reactive({
  dialog: {
    show: false,
    text: ''
  }
})

const data = reactive({
  name: props.moYunFile.name
})

const handleSave = async () => {
  if (cs.dialog.show || props.moYunFile.name.trim() === data.name.trim()) return
  const { message } = await props.moYunFile.rename(data.name)
  if (message) {
    cs.dialog.show = true
    cs.dialog.text = message
    data.name = props.moYunFile.name
    
  }
}
</script>

<template>
  <v-textarea
    v-if="moYunFile.isRename"
    class="mt-3 position-absolute w-100"
    style="z-index: 9999999; left: 0"
    :bg-color="appStore.customThemeColor('fileRenameBg')"
    variant="outlined"
    density="compact"
    auto-grow
    autofocus
    rows="1"
    v-model="data.name"
    v-click-outside="handleSave"
  ></v-textarea>

  <!-- 重命名提示 -->
  <v-dialog width="500" v-model="cs.dialog.show">
    <v-card>
      <v-card-text>
        {{ cs.dialog.text }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn :text="$t('confirm.text')" @click="cs.dialog.show = false"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped></style>
