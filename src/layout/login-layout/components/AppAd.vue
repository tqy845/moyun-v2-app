<!--
  AppAd
  @author 谭期元
  @date  2023/09/15
  @description “广告”组件
-->
<script lang="ts" setup>
import { ref } from 'vue'
const data = ref([
  {
    title: '安全可控',
    subheader: 'Secure and Controllable',
    backgroundColor: 'indigo'
  },
  {
    title: '高效稳定',
    subheader: 'Efficient and Stable',
    backgroundColor: 'warning'
  },
  {
    title: '隐私至上',
    subheader: 'Privacy First',
    backgroundColor: 'pink darken-2'
  },
  {
    title: '定制灵活',
    subheader: 'Customizable and Flexible',
    backgroundColor: 'red lighten-1'
  },
  {
    title: '私密存储',
    subheader: 'Confidential Storage',
    backgroundColor: 'grey'
  }
])
</script>

<template>
  <v-carousel :show-arrows="false" cycle height="100%" hide-delimiters>
    <v-carousel-item v-for="(item, index) in data" :key="index">
      <v-sheet :color="item.backgroundColor" height="100%">
        <div class="d-flex flex-column fill-height justify-center align-center">
          <p class="text-h2 mb-5">{{ item.title }}</p>
          <p class="text-h4 font-weight-light">{{ item.subheader }}</p>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<style lang="scss" scoped></style>
