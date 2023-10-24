<!--
  AppBasic
  @author 谭期元
  @date  2023/10/23
  @description “通用配置”组件
-->
<script lang="ts" setup>
import { useAppStore, useFileStore } from '@/stores'
import { reactive } from 'vue'

const appStore = useAppStore()
const fileStore = useFileStore()

const data = reactive({
  tab: null,
  select: ['Vuetify', 'Programming'],
  items: ['Programming', 'Design', 'Vue', 'Vuetify']
})
</script>

<template>
  <v-card class="">
    <v-tabs v-model="data.tab" align-tabs="end">
      <v-tab :value="1">基本</v-tab>
      <v-tab :value="2">菜单</v-tab>
      <v-tab :value="3">主题</v-tab>
    </v-tabs>
    <v-window v-model="data.tab">
      <v-window-item :value="1">
        <v-container fluid>
          <v-card flat>
            <v-card-item>
              <v-checkbox
                v-model="appStore['settings']['basic']['launchWelcome']"
                label="登录后显示欢迎页"
              ></v-checkbox>
            </v-card-item>
            <v-card-item>
              <v-checkbox
                v-model="appStore['settings']['basic']['powerOn']"
                label="开机自动启动（推荐）"
              ></v-checkbox>
            </v-card-item>
            <v-card-item>
              <v-checkbox
                v-model="appStore['settings']['basic']['autoUpdate']"
                label="自动升级"
              ></v-checkbox>
            </v-card-item>
          </v-card>
        </v-container>
      </v-window-item>

      <v-window-item :value="2">
        <v-container fluid>
          <v-card flat>
            <v-card-item>
              <v-combobox
                v-model="data.select"
                :items="data.items"
                label="二级菜单"
                multiple
              ></v-combobox>
            </v-card-item>
            <v-card-item>
              <v-combobox
                v-model="fileStore.showClassMenuItems"
                :items="fileStore.classMenuItems"
                item-title="label"
                item-value="key"
                label="文件分类"
                item-props=""
                multiple
                return-object
              >
                <template #selection="data">
                  <v-chip size="small">
                    <template v-slot:prepend>
                      <!-- {{ data.item }} -->
                      <v-icon :icon="`mdi-${data.item.raw.icon}`" class="pr-1"></v-icon>
                    </template>
                    {{ data.item.title }}
                  </v-chip>
                </template>
              </v-combobox>
            </v-card-item>
          </v-card>
        </v-container>
      </v-window-item>

      <v-window-item :value="3">
        <v-container fluid>
          <v-card flat> </v-card>
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<style lang="scss" scoped></style>
