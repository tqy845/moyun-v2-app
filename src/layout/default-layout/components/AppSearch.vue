<!--
  AppSearch
  @author 谭期元
  @date  2023/09/15
  @description “搜索”组件
-->

<script lang="ts" setup>
import { useAppStore, useFileStore } from '@/stores'
import { FileType } from '@/types/enums'
import { useDebounceFn } from '@vueuse/core'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const appStore = useAppStore()
const fileStore = useFileStore()

const cs = reactive({
  dialog: {
    show: false
  }
})

const handleSearch = useDebounceFn((name: string) => appStore.globalSearch(name), 300)
</script>

<template>
  <v-dialog width="500" v-bind="$attrs">
    <template v-slot:activator="{ props }">
      <v-list>
        <v-list-item>
          <v-btn
            block
            class="text-none"
            rounded="lg"
            style="justify-content: space-between"
            variant="tonal"
            v-bind="props"
          >
            <template #prepend>
              <v-icon>mdi-magnify</v-icon>
              <span
                class="text-capitalize font-weight-medium"
                style="line-height: 10px; letter-spacing: 0"
              >
                {{ $t('search.text') }}</span
              >
            </template>

            <template #append
              ><span
                class="text-capitalize text-caption bg-grey-lighten-1 px-1 text-medium-emphasis font-weight-bold position-relative"
                style="left: 5px; border-radius: 7px"
                >ctrl k</span
              ></template
            >
          </v-btn>
        </v-list-item>
      </v-list>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card :title="$t('global.search.title.text')">
        <v-card-text>
          <v-autocomplete
            autofocus
            :items="appStore.searchRecord"
            auto-select-first
            density="comfortable"
            item-props
            menu-icon=""
            item-title="name"
            item-value="name"
            :placeholder="$t('global.search.placeholder.text')"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            v-model="appStore.search"
            @update:search="handleSearch"
            clearable
          ></v-autocomplete>

          <div v-if="!appStore.search">
            <v-row justify="center" align="center">
              <v-icon icon="mdi-text-search-variant" size="150" color="grey-lighten-1"></v-icon>
            </v-row>
            <v-row justify="center" align="center">
              <p class="text-grey-lighten-1">
                {{ $t('global.search.text') }}
              </p>
            </v-row>
          </div>
          <v-list v-else lines="one">
            <v-list-item
              v-for="(item, index) in appStore.searchResult"
              :key="index"
              :title="item.title"
              :subtitle="item.subtitle"
              @click="() => ($router.push(item.to), (isActive.value = false))"
            ></v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style lang="scss" scoped></style>
