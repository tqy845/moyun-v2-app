<!--
  index
  @author 谭期元
  @date  2023/09/30
  @description “应用配置”
-->

<script lang="ts" setup>
import { reactive } from 'vue'

const cs = reactive({
  tab: 'option-1'
})

const form = reactive({
  powerOn: '', // 开机自启
  autoUpdate: '' // 自动升级
})

const handleSave = () => {
  console.log('保存')
}
</script>

<template>
  <v-card>
    <v-card-item class="">
      <v-text-field class="py-2" label="搜索设置" variant="outlined"></v-text-field>

      <div class="d-flex flex-row">
        <v-tabs v-model="cs.tab" direction="vertical" color="primary">
          <v-tab value="option-1">
            <v-icon start> mdi-cog </v-icon>
            基本
          </v-tab>
          <v-tab value="option-2">
            <v-icon start> mdi-send </v-icon>
            传输
          </v-tab>
          <v-tab value="option-3">
            <v-icon start> mdi-keyboard-settings </v-icon>
            快捷键
          </v-tab>
          <v-tab value="option-4">
            <v-icon start> mdi-sync </v-icon>
            同步盘
          </v-tab>
        </v-tabs>
        <v-window v-model="cs.tab" class="w-100 pa-5">
          <v-window-item value="option-1">
            <v-card flat>
              <v-card-item>
                <form fast-fail @submit.prevent="handleSave">
                  <v-row>
                    <v-checkbox v-model="form.powerOn" label="开机自动启动（推荐）"></v-checkbox>
                  </v-row>
                  <v-row>
                    <v-checkbox v-model="form.autoUpdate" label="自动升级"></v-checkbox>
                  </v-row>
                </form> </v-card-item
            ></v-card>
          </v-window-item>
          <v-window-item value="option-2" class="w-100 pa-5">
            <v-form>
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
            </v-form>
          </v-window-item>
          <v-window-item value="option-3">
            <v-card flat>
              <v-card-text>
                <p>
                  Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui.
                  Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a
                  accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor
                  auctor, justo.
                </p>

                <p class="mb-0">
                  Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien
                  ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec,
                  pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
                </p>
              </v-card-text>
            </v-card>
          </v-window-item>
          <v-window-item value="option-4">
            <v-card flat>
              <v-card-text>
                <p>
                  Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui.
                  Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a
                  accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor
                  auctor, justo.
                </p>

                <p class="mb-0">
                  Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien
                  ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec,
                  pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
                </p>
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
      </div>
    </v-card-item>
  </v-card>
</template>

<style lang="scss" scoped></style>
