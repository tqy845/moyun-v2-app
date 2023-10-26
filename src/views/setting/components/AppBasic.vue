<!--
  AppBasic
  @author 谭期元
  @date  2023/10/23
  @description “通用配置”组件
-->
<script lang="ts" setup>
import { useAppStore, useFileStore } from '@/stores'
import { MoYunFile } from '@/types/models'
import { fileUtils } from '@/utils/functions'

const appStore = useAppStore()
const fileStore = useFileStore()
</script>

<template>
  <v-card class="">
    <v-tabs
      v-model="appStore['app']['menuIndex']['currentSettingOpenTab']['basic']['tab']"
      align-tabs="end"
    >
      <v-tab :value="1">基本</v-tab>
      <v-tab :value="2">菜单</v-tab>
      <v-tab :value="3">主题</v-tab>
    </v-tabs>
    <v-window v-model="appStore['app']['menuIndex']['currentSettingOpenTab']['basic']['tab']">
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
                v-model="fileStore.showMenuItems"
                :items="fileStore.menuItems"
                item-title="text"
                item-value="key"
                label="二级菜单"
                multiple
                return-object
              >
                <template #selection="data">
                  <v-chip size="small">
                    <template v-slot:prepend>
                      <v-icon :icon="`mdi-${data.item.raw.icon}`" class="pr-1"></v-icon>
                    </template>
                    {{ data.item.title }}
                  </v-chip>
                </template>
              </v-combobox>
            </v-card-item>
            <v-card-item>
              <v-combobox
                v-model="fileStore.showClassMenuItems"
                :items="fileStore.classMenuItems"
                item-title="label"
                item-value="key"
                label="文件分类"
                multiple
                return-object
              >
                <template #selection="data">
                  <v-chip size="small">
                    <template v-slot:prepend>
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
          <v-list density="compact">
            <v-list-item-title>文件</v-list-item-title>
            <v-divider class="my-1"></v-divider>
            <v-list-item class="">
              <v-radio-group inline v-model="appStore['settings']['basic']['iconColorTheme']">
                <template v-slot:label>
                  图标主题：
                  <!-- {{ fileUtils.iconColors }} -->
                  <v-icon
                    :icon="`mdi-file-excel`"
                    :size="20"
                    :color="
                      fileUtils.iconColors[
                        appStore['settings']['basic']['iconColorTheme'] === '1'
                          ? 'file-excel'
                          : 'pure'
                      ]
                    "
                  ></v-icon>
                  <v-icon
                    :icon="`mdi-file-word`"
                    :size="20"
                    :color="
                      fileUtils.iconColors[
                        appStore['settings']['basic']['iconColorTheme'] === '1'
                          ? 'file-word'
                          : 'pure'
                      ]
                    "
                  ></v-icon>
                  <v-icon
                    :icon="`mdi-file-powerpoint`"
                    :size="20"
                    :color="
                      fileUtils.iconColors[
                        appStore['settings']['basic']['iconColorTheme'] === '1'
                          ? 'file-powerpoint'
                          : 'pure'
                      ]
                    "
                  ></v-icon>
                  <v-icon
                    :icon="`mdi-file-document`"
                    :size="20"
                    :color="
                      fileUtils.iconColors[
                        appStore['settings']['basic']['iconColorTheme'] === '1'
                          ? 'file-document'
                          : 'pure'
                      ]
                    "
                  ></v-icon>
                  <v-icon
                    :icon="`mdi-file-cloud`"
                    :size="20"
                    :color="
                      fileUtils.iconColors[
                        appStore['settings']['basic']['iconColorTheme'] === '1' ? 'default' : 'pure'
                      ]
                    "
                  ></v-icon>
                </template>
                <v-radio label="彩色" value="1"></v-radio>
                <v-radio label="纯色" value="2"></v-radio>
              </v-radio-group>
            </v-list-item>
          </v-list>
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<style lang="scss" scoped></style>
