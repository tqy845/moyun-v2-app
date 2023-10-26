<!--
  AppBasic
  @author 谭期元
  @date  2023/10/23
  @description “通用配置”组件
-->
<script lang="ts" setup>
import { useAppStore, useFileStore } from '@/stores'
import { useTheme } from 'vuetify'
import { fileUtils } from '@/utils/functions'
import { reactive } from 'vue'
import { switchTheme } from '@/plugins'

const theme = useTheme()

const appStore = useAppStore()
const fileStore = useFileStore()

const cs = reactive({
  themeDialog: {
    show: false
  }
})
</script>

<template>
  <v-card class="">
    <v-tabs
      v-model="appStore['app']['menuIndex']['currentSettingOpenTab']['basic']['tab']"
      align-tabs="end"
    >
      <v-tab :value="1">{{ $t('universal.title.text') }}</v-tab>
      <v-tab :value="2">{{ $t('menu.title.text') }}</v-tab>
      <v-tab :value="3">{{ $t('theme.title.text') }}</v-tab>
    </v-tabs>
    <v-window v-model="appStore['app']['menuIndex']['currentSettingOpenTab']['basic']['tab']">
      <v-window-item :value="1">
        <v-container fluid>
          <v-card flat>
            <v-card-item>
              <v-checkbox
                v-model="appStore['settings']['basic']['launchWelcome']"
                :label="$t('settings.item.showWelcomePage.text')"
              ></v-checkbox>
            </v-card-item>
            <v-card-item>
              <v-checkbox
                v-model="appStore['settings']['basic']['powerOn']"
                :label="$t('settings.item.autoLaunch.text')"
              ></v-checkbox>
            </v-card-item>
            <v-card-item>
              <v-checkbox
                v-model="appStore['settings']['basic']['autoUpdate']"
                :label="$t('settings.item.autoUpdate.text')"
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
                :items="fileStore.menuItems.map((it) => ({ ...it, text: $t(it.text) }))"
                item-title="text"
                item-value="path"
                :label="$t('settings.item.secondaryMenu.text')"
                multiple
                return-object
              >
                <template #selection="data">
                  <v-chip size="small">
                    <template v-slot:prepend>
                      <v-icon :icon="`mdi-${data.item.raw.icon}`" class="pr-1"></v-icon>
                    </template>
                    {{ $t(data.item.title) }}
                  </v-chip>
                </template>
              </v-combobox>
            </v-card-item>
            <v-card-item>
              <v-combobox
                v-model="fileStore.showClassMenuItems"
                :items="fileStore.classMenuItems.map((it) => ({ ...it, label: $t(it.label) }))"
                item-title="label"
                item-value="key"
                :label="$t('settings.item.fileClassify.text')"
                multiple
                return-object
              >
                <template #selection="data">
                  <v-chip size="small">
                    <template v-slot:prepend>
                      <v-icon :icon="`mdi-${data.item.raw.icon}`" class="pr-1"></v-icon>
                    </template>
                    {{ $t(data.item.title) }}
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
            <v-list-item-title class="text-h6">{{ $t('toggle.interface') }}</v-list-item-title>
            <v-divider class="my-1"></v-divider>
            <v-list-item class="my-1">
              <p class="text-subtitle-1 text-grey-darken-1">{{ $t('toggle.theme.title.text') }}</p>
              <v-radio-group
                inline
                v-model="appStore['settings']['basic']['colorTheme']"
                @update:model-value="switchTheme"
              >
                <v-radio :label="$t('toggle.theme.light.text')" value="light"></v-radio>
                <v-radio :label="$t('toggle.theme.dark.text')" value="dark"></v-radio>
              </v-radio-group>
            </v-list-item>
          </v-list>

          <v-list density="compact">
            <v-list-item-title class="text-h6">{{
              $t('settings.item.fileSettings.title.text')
            }}</v-list-item-title>
            <v-divider class="my-1"></v-divider>
            <v-list-item class="my-1">
              <p class="text-subtitle-1 text-grey-darken-1">
                {{ $t('settings.item.fileSettings.iconTheme.text') }}
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
                      appStore['settings']['basic']['iconColorTheme'] === '1' ? 'file-word' : 'pure'
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
                ...
              </p>
              <v-radio-group inline v-model="appStore['settings']['basic']['iconColorTheme']">
                <v-radio :label="$t('settings.item.fileSettings.colour.text')" value="1"></v-radio>
                <v-radio :label="$t('settings.item.fileSettings.pure.text')" value="2"></v-radio>
              </v-radio-group>
            </v-list-item>
          </v-list>
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<style lang="scss" scoped></style>
