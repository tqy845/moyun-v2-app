<!--
  AppSearch
  @author 谭期元
  @date  2023/09/15
  @description “搜索”组件
-->

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const props = defineProps({
  demoEvent: {
    type: Function
  }
})

const data = reactive({
  items: [
    {
      prependIcon: 'mdi-clock-outline',
      title: 'recipe with chicken'
    },
    {
      prependIcon: 'mdi-clock-outline',
      title: 'best hiking trails near me'
    },
    {
      prependIcon: 'mdi-clock-outline',
      title: 'how to learn a new language'
    },
    {
      prependIcon: 'mdi-clock-outline',
      title: 'DIY home organization ideas'
    },
    {
      prependIcon: 'mdi-clock-outline',
      title: 'latest fashion trends'
    }
  ],
  shortcuts: [
    {
      icon: 'mdi-github',
      title: 'Master ',
      href: 'https://github.com/vuetifyjs/vuetify'
    },
    {
      icon: 'mdi-github',
      title: 'Dev',
      href: 'https://github.com/vuetifyjs/vuetify/tree/dev'
    },
    {
      icon: 'mdi-github',
      title: 'Stable',
      href: 'https://github.com/vuetifyjs/vuetify/tree/v2-stable'
    },
    {
      icon: 'mdi-github',
      title: 'My Pull Requests',
      href: 'https://github.com/vuetifyjs/vuetify/pulls/johnleider'
    }
  ]
})
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

    <template v-slot:default="{}">
      <v-card :title="$t('global.search.title.text')">
        <v-card-text>
          <v-autocomplete
            autofocus
            :items="data.items"
            auto-select-first
            class="flex-full-width"
            density="comfortable"
            item-props
            menu-icon=""
            :placeholder="$t('global.search.placeholder.text')"
            prepend-inner-icon="mdi-magnify"
            theme="light"
            variant="outlined"
          ></v-autocomplete>

          <v-row justify="center" align="center">
            <v-icon icon="mdi-text-search-variant" size="150" color="grey-lighten-1"></v-icon>
          </v-row>
          <v-row justify="center" align="center">
            <p class="text-grey-lighten-1">{{ $t('global.search.text') }}</p>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style lang="scss" scoped></style>
