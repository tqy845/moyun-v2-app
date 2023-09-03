<script lang="ts" setup>
import { reactive } from 'vue'

const props = defineProps({
  img: {
    type: String,
    required: true
  }
})

const form = reactive({
  username: '',
  password: '',
  code: ''
})




const emits = defineEmits(['close', 'save', 'refresh'])
</script>

<template>
  <v-dialog persistent v-bind="$attrs" width="1024">
    <v-card>
      <v-card-title>
        <span class="text-h5">账户登录</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.username"
                label="Account or Email"
                required
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="form.password"
                label="Password"
                required
                type="password"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="9">
              <v-text-field
                v-model="form.code"
                label="Code"
                required
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-img :src="img" height="60" @click="emits('refresh')">
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular indeterminate></v-progress-circular>
                  </div>
                </template>
              </v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="flat" @click="emits('close')"> 关闭</v-btn>
        <v-btn
          class="text-none ms-4 text-white"
          color="blue-darken-1"
          variant="flat"
          @click="emits('save', form)"
        >
          登录
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped></style>
