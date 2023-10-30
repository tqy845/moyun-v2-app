<!--
  AppPathBar
  @author 谭期元
  @date  2023/10/24
  @description “文件地址栏”组件
-->

<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue'
import { useFileStore } from '@/stores'
const breadcrumbsRef = ref()
const fileStore = useFileStore()

watch(
  () => fileStore.breadcrumbItems,
  () => {
    updateBreadcrumbItems()
  },
  {
    deep: true
  }
)

/**
 * 更新面包屑导航
 */
const updateBreadcrumbItems = () =>
  nextTick(() => {
    const ele: HTMLElement | null = document.querySelector('.v-breadcrumbs')

    if (ele) {
      let shouldContinue = true // 添加一个标志来控制循环继续
      while (shouldContinue) {
        // 使用该标志作为循环条件
        const containerWidth = ele.offsetWidth!
        let sumWidth = 0
        let sumWidthExcludeLastElement = 0
        let lastElementWidth = 0,
          lastElementNode = null

        for (const key in ele.children) {
          const element = ele.children[key] as HTMLElement

          if (typeof element === 'object' && element.offsetWidth) {
            lastElementNode = element.querySelector('.text-truncate') as HTMLElement
            lastElementWidth = element.offsetWidth
            sumWidth += lastElementWidth
          }
        }

        sumWidthExcludeLastElement = sumWidth - lastElementWidth

        if (sumWidth > containerWidth) {
          const calc = containerWidth - sumWidthExcludeLastElement - 16 * 2
          if (calc <= 0) {
            fileStore.moreBreadcrumbItems.unshift(fileStore.breadcrumbItems.splice(1, 1)[0])
            shouldContinue = false // 停止循环
          } else {
            lastElementNode!.style.width = `${calc}px` // sumWidth - sumWidthExcludeLastElement
            console.log(calc)
          }
        } else {
          shouldContinue = false // 停止循环
        }
      }
    }
  })
</script>

<template>
  <v-breadcrumbs ref="breadcrumbsRef" :items="fileStore.breadcrumbItems" class="">
    <template v-slot:prepend>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            variant="text"
            color="black"
            style="opacity: 1 !important"
            block
            class="pa-0"
            :disabled="!fileStore.moreBreadcrumbItems.length"
          >
            <v-icon size="30" :icon="'mdi-' + 'folder-open'" class="px-4"></v-icon>
            <span
              v-show="!!fileStore.moreBreadcrumbItems.length"
              class="position-absolute font-weight-bold text-body text-white"
              >{{ fileStore.moreBreadcrumbItems.length }}</span
            >
          </v-btn>
        </template>
        <v-list max-height="300">
          <v-list-item
            v-for="(item, index) in fileStore.moreBreadcrumbItems"
            :key="index"
            :value="index"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
    <template v-slot:title="{ item }">
      <v-btn block variant="text" class="pa-1 ma-0 text-h6" @click="fileStore.skipPath(item)">
        <span class="d-inline-block text-truncate">
          {{ item.title }}
        </span>
      </v-btn>
    </template>
  </v-breadcrumbs>
</template>

<style lang="scss" scoped></style>
