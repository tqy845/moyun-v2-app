<!--
  AppFileSearch
  @author 谭期元
  @date  2023/09/19
  @description “文件模糊搜索”组件
-->

<script lang="ts" setup>
import { useFileStore } from '@/stores'
import { useDebounceFn } from '@vueuse/core'
import { reactive } from 'vue'

const fileStore = useFileStore()

const cs = reactive({
  autocomplete: {
    show: false
  }
})

const handleSearchItem = useDebounceFn((name: string) => fileStore.filter(name), 300)
</script>

<template>
  <v-row v-if="cs.autocomplete.show" class="mt-3 mr-3">
    <v-autocomplete
      clearable
      :label="$t('file.search.placeholder.text')"
      variant="outlined"
      :items="fileStore.classify()"
      item-title="name"
      item-value="name"
      autofocus
      @update:modelValue="handleSearchItem"
      v-model="fileStore.search"
    >
      <template #prepend>
        <v-btn icon v-if="!cs.autocomplete.show" @click="cs.autocomplete.show = true">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-autocomplete>
  </v-row>

  <v-btn icon @click="cs.autocomplete.show = !cs.autocomplete.show">
    <v-icon>{{
      'mdi-' +
      (cs.autocomplete.show
        ? `magnify-remove-outline`
        : fileStore.search
        ? `magnify-plus-cursor`
        : `magnify`)
    }}</v-icon>
  </v-btn>
</template>

<style lang="scss" scoped></style>
