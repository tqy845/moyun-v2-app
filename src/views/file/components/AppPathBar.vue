<template>
  <div class="breadcrumb" ref="breadcrumbContainer">
    <div class="breadcrumb-items" :style="{ width: breadcrumbWidth + 'px' }">
      <div
        v-for="(item, index) in breadcrumbItems"
        :key="index"
        class="breadcrumb-item"
        @click="goTo(item.path)"
      >
        {{ item.name }}
        <span class="breadcrumb-separator"></span>
      </div>
    </div>
    <div class="dropdown" v-if="hasDropdown">
      <button class="btn btn-secondary dropdown-toggle" @click="toggleDropdown">
        {{ currentPath }} <span class="caret"></span>
      </button>
      <div class="dropdown-menu" v-if="isDropdownOpen">
        <div class="dropdown-item" v-for="(item, index) in breadcrumbItems" :key="index">
          <a :href="item.path">{{ item.name }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'

export default {
  name: 'Breadcrumb',
  props: {
    breadcrumbItems: {
      type: Array,
      required: true
    },
    currentPath: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const breadcrumbWidth = ref(0)
    const hasDropdown = ref(false)
    const isDropdownOpen = ref(false)
    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value
    }
    const goTo = (path: string) => {
      props.currentPath = path
      isDropdownOpen.value = false
    }
    onMounted(() => {
      const container = document.querySelector('.breadcrumb')
      if (container && container.scrollWidth > container.offsetWidth) {
        hasDropdown.value = true
      } else {
        hasDropdown.value = false
      }
    })
    return { breadcrumbWidth, hasDropdown, isDropdownOpen, toggleDropdown, goTo }
  }
}
</script>
