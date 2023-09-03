<!--
  TheFile
  @author 谭期元
  @date  2023/08/07
  @description “搜索”组件
-->
<script lang="ts" setup></script>

<template>
  <v-list>
    <v-list-item>
      <v-btn
        block
        class="text-none"
        rounded="lg"
        style="justify-content: space-between"
        variant="tonal"
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
