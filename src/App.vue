<!-- App -->
<script lang="ts" setup>
import { AppNotification } from '@/components/custom'

window.addEventListener('drop', (e) => e.preventDefault(), false)
window.addEventListener('dragover', (e) => e.preventDefault(), false)
window.addEventListener('contextmenu', (e) => e.preventDefault(), false)
</script>

<template>
  <AppNotification />
  <RouterView />
</template>

<style>
html {
  overflow: auto !important;
}

/* 定义滚动条的宽度 */
::-webkit-scrollbar {
  width: 8px;
}

/* 定义滚动条轨道的样式 */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* 定义滚动条滑块的样式 */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
  border: 0.5px solid white;
}

/* 添加滚动条滑块悬停效果 */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.text-indent {
  text-indent: 2em; /* 设置首行缩进的大小，可以根据需要进行调整 */
}

.hidden-none {
  display: block !important; /* 或者 display: flex !important; 或其他适当的 display 值 */
}

.w-min {
  min-width: 100% !important;
}
</style>
