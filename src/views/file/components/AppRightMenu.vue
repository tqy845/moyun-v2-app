<!--
  AppRightMenu
  @author 谭期元
  @date  2023/10/15
  @description “上下文右键”菜单
-->

<script lang="ts" setup>
import { reactive } from 'vue'
import { RightMenuItem } from '@/types/enums/right-menu'

const emits = defineEmits(['confirm', 'cancel'])

const props = defineProps({
  menuItems: {
    type: Array as () => Array<RightMenuItem>,
    default: () => []
  },
  location: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <v-card
    v-bind="$attrs"
    class="mx-auto elevation-1 rounded-lg"
    width="220px"
    style="border: 1px solid #dcdcdc8a"
    :style="{ left: location['x'] + 'px', top: location['y'] + 'px' }"
    v-click-outside="{
      handler: () => emits('cancel')
    }"
  >
    <v-list class="px-2" lines="one" density="compact">
      <div v-for="(item, i) in menuItems" :key="i">
        <v-divider v-if="item.type === 'divider'" class="my-2"></v-divider>
        <v-list-item
          v-else
          rounded="xl"
          @click="emits('confirm', { labelType: item.text, actionType: item.type })"
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
  position: fixed;
  z-index: 99999;
}
</style>
