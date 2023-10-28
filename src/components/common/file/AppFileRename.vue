<!--
  AppFileRename
  @author 谭期元
  @date  2023/10/28
  @description “文件重命名提示”组件
-->
<script lang="ts" setup>
import { useAppStore, useFileStore } from '@/stores'
import { MoYunFile } from '@/types/models'
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
    show: false
  }
})

const data = reactive({
  name: props.moYunFile.name
})

const handleSave = () => {
  // cs.dialog.show = true
  // props.moYunFile.rename(data.name)
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
    <template v-slot:default="{ isActive }">
      <v-card title="Dialog">
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style lang="scss" scoped></style>
