<!--
  index
  @author 谭期元
  @date  2023/09/30
  @description “应用配置”页
-->

<script lang="ts" setup>
import { useAppStore } from '@/stores'
import { AppBasic } from './components'

const appStore = useAppStore()
</script>

<template>
  <v-card>
    <v-card-item class="">
      <v-text-field
        class="py-2"
        :label="$t('searchSetting.title.text')"
        variant="outlined"
      ></v-text-field>

      <div class="d-flex flex-row">
        <v-tabs
          v-model="appStore['app']['menuIndex']['currentSettingOpenTab']['basic']['index']"
          direction="vertical"
          color="primary"
        >
          <v-tab value="option-1">
            <v-icon start> mdi-cog </v-icon>
            {{ $t('settings.menu.application.title.text') }}
          </v-tab>
          <v-tab value="option-2">
            <v-icon start> mdi-send </v-icon>
            {{ $t('settings.menu.transmit.title.text') }}
          </v-tab>
          <v-tab value="option-3">
            <v-icon start> mdi-keyboard-settings </v-icon>
            {{ $t('settings.menu.shortcut.title.text') }}
          </v-tab>
          <v-tab value="option-4">
            <v-icon start> mdi-sync </v-icon>
            {{ $t('settings.menu.synchrodisk.title.text') }}
          </v-tab>
        </v-tabs>
        <v-window
          v-model="appStore['app']['menuIndex']['currentSettingOpenTab']['basic']['index']"
          class="w-100"
        >
          <v-window-item value="option-1">
            <!-- 基础配置 -->
            <AppBasic />
          </v-window-item>
          <v-window-item value="option-2" class="w-100 pa-5">
            <!-- <v-form>
              <v-row>
                <v-col cols="18">
                  <v-select
                    class="ma-5"
                    label="上传并行任务数"
                    :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                    variant="outlined"
                  ></v-select>
                </v-col>

                <v-col cols="18">
                  <v-select
                    class="ma-5"
                    label="下载并行任务数"
                    :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                    variant="outlined"
                  ></v-select>
                </v-col>
              </v-row>
            </v-form> -->
          </v-window-item>
          <v-window-item value="option-3">
            <v-card flat>
              <v-card-text> </v-card-text>
            </v-card>
          </v-window-item>
          <v-window-item value="option-4">
            <v-card flat>
              <v-card-text> </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
      </div>
    </v-card-item>
  </v-card>
</template>

<style lang="scss" scoped></style>
