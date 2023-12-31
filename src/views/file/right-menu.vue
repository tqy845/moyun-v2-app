<!--
  right-menu
  @author 谭期元
  @date  2023/10/01
  @description “右键菜单”页
-->

<script lang="ts" setup>
import { ActionTypeValue } from '@/types/enums'
import { RightMenuItem } from '@/types/models'
import { emit, listen } from '@tauri-apps/api/event'
import { appWindow } from '@tauri-apps/api/window'
import { useElementSize } from '@vueuse/core'
import { onMounted, reactive, ref } from 'vue'

const cardRef = ref()

const cardSize = useElementSize(cardRef)

const cs = reactive<{
  menuItems: Array<RightMenuItem>
  labelType?: string | number
}>({
  menuItems: []
})

onMounted(async () => {
  await listen(
    'action',
    async (event: {
      windowLabel: string
      payload: { actionType: ActionTypeValue; actionData: { [key: string]: any } }
    }) => {
      const {
        payload: { actionType, actionData }
      } = event
      // console.log('action', actionType, actionData)
      // console.log(width.value, height.value)
      cs.menuItems = actionData as Array<RightMenuItem>
      cs.labelType = actionType
      const { width, height } = cardSize
      appWindow.show() // 显示
      appWindow.setFocus() // 置顶
    }
  )
})
</script>

<template>
  <v-card
    ref="cardRef"
    class="mx-auto elevation-1 rounded-lg"
    width="256"
    style="border: 1px solid #dcdcdc8a"
  >
    <v-list class="px-2" lines="one" density="compact">
      <div v-for="(item, i) in cs.menuItems" :key="i">
        <v-divider v-if="item.type === 'divider'" class="my-2"></v-divider>
        <v-list-item
          v-else
          rounded="xl"
          @click="emit('click', { labelType: cs.labelType, actionType: item.type })"
        >
          <v-list-item-title>
            <v-row align="center">
              <v-col
                cols="6"
                class="text-caption font-weight-bold"
                :class="[`text-${item.color ?? 'grey-darken-2'}`]"
              >
                <v-icon :icon="'mdi-' + item.icon" :color="item?.color" class="mr-2"></v-icon>
                {{ $t(item.text ?? '') }}</v-col
              >
              <v-col
                cols="6"
                class="text-end font-weight-regular font-italic text-caption pr-4"
                style="font-size: 12px"
              >
                <span v-if="!item.rightIcon">{{ item.shortcutKey }}</span>
                <v-icon v-else :icon="'mdi-' + item.rightIcon"></v-icon>
              </v-col>
            </v-row>
          </v-list-item-title>
        </v-list-item>
      </div>
    </v-list>
  </v-card>
</template>

<style lang="scss" scoped>
.v-card {
  position: absolute;
}
</style>
