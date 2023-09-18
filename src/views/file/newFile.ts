import { onMounted } from 'vue'
import { fileStore } from './index.vue'

onMounted(() => {
  // data.fileList = fileStore.list()
  console.log(await fileStore.list())
})
