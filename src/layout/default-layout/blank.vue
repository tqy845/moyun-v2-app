<!--
  blank
  @author 谭期元
  @date  2023/09/15
  @description “空白页”
-->

<script lang="ts" setup></script>

<template>
  <v-container class="fill-height">
    <v-row class="flex-column text-center" justify="center" align="center">
      <v-col class="" justify="center" align="center">
        <v-img aspect-ratio="1/1" width="220" src="img/icons/512x512.png"></v-img>
      </v-col>
      <v-col class="text-button pa-0 ma-1"
        >{{ $t('blank.page.button1.text') }}
        <code class="bg-grey-lighten-3 pa-2 rounded-lg">Ctrl</code> +
        <code class="bg-grey-lighten-3 pa-2 rounded-lg">K</code></v-col
      >
      <v-col class="text-button pa-0 ma-1"
        >{{ $t('blank.page.button2.text') }}
        <code class="bg-grey-lighten-3 pa-2 rounded-lg">Ctrl</code> +
        <code class="bg-grey-lighten-3 pa-2 rounded-lg">F</code></v-col
      >
      <v-col class="text-button pa-0 ma-1"
        >{{ $t('blank.page.button3.text') }}
        <code class="bg-grey-lighten-3 pa-2 rounded-lg">Ctrl</code> +
        <code class="bg-grey-lighten-3 pa-2 rounded-lg">A</code></v-col
      >
      <v-col class="text-button pa-0 ma-1"
        >{{ $t('blank.page.button4.text') }}
        <code class="bg-grey-lighten-3 pa-2 rounded-lg">Ctrl</code> +
        <code class="bg-grey-lighten-3 pa-2 rounded-lg">D</code></v-col
      >
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped></style>
