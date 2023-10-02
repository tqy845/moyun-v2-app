<!--
  right-menu
  @author 谭期元
  @date  2023/10/01
  @description “右键菜单”页
-->

<script lang="ts" setup>
import { useFileStore } from '@/stores'
import { ACTION_TYPE } from '@/types/enums'
import { BasicFile } from '@/types/models'
import { emit } from '@tauri-apps/api/event'
import { reactive } from 'vue'

const fileStore = useFileStore()
const props = defineProps({
  file: {
    type: BasicFile,
    required: true
  }
})

const cs = reactive({
  deleteConfirm: {
    show: false
  }
})

const items = [
  {
    text: 'right.menu.open.text',
    icon: 'mdi-open-in-app',
    actionType: ACTION_TYPE.OPEN,
    shortcutKey: 'Enter'
  },
  {
    text: 'right.menu.download.text',
    icon: 'mdi-cloud-download',
    actionType: ACTION_TYPE.DOWNLOAD
  },
  {
    text: 'right.menu.shared.text',
    icon: 'mdi-account-multiple',
    actionType: ACTION_TYPE.SHARE
  },
  {
    text: 'right.menu.property.text',
    icon: 'mdi-wrench',
    actionType: ACTION_TYPE.PROPERTY,
    shortcutKey: 'Alt+Enter'
  },
  {
    text: 'right.menu.delete.text',
    icon: 'mdi-delete',
    actionType: ACTION_TYPE.DELETE,
    color: 'red',
    shortcutKey: 'Ctrl+D'
  }
]
</script>

<template>
  <v-card class="mx-auto elevation-1 rounded-lg" width="256" style="border: 1px solid #dcdcdc8a">
    <v-list class="px-2" lines="one" density="compact">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        color="primary"
        rounded="xl"
        @click="emit('click', { actionType: item.actionType })"
      >
        <v-list-item-title>
          <v-row align="center">
            <v-col
              cols="6"
              class="text-caption font-weight-bold"
              :class="[`text-${item.color ?? 'grey-darken-2'}`]"
            >
              <v-icon :icon="item.icon" :color="item?.color" class="mr-2"></v-icon>
              {{ $t(item.text) }}</v-col
            >
            <v-col
              cols="6"
              class="text-end font-weight-regular font-italic text-caption pr-4"
              style="font-size: 12px"
              >{{ item.shortcutKey }}
            </v-col>
          </v-row>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style lang="scss" scoped>
.v-card {
  position: absolute;
}
</style>
