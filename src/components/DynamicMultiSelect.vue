<template>
  <div class="_package_select_container" @click="openDropDown()" ref="multiDropdown">
    <div class="_dynamic_container">
      <div class="_select_placeholder_text">2 selected</div>
    </div>

    <div v-if="isOpen === true">
      <div class="_dynamic_drop_down"></div>

      <div class="_dynamic_search_container">
        <input placeholder="Search...." class="_dynamic_search_input" type="text" />
      </div>

      <ul class="_dynamic_list_container">
        <li>Opadokun Solomon</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const isOpen = ref(false)
const multiDropdown = ref<HTMLElement | null>(null)

const openDropDown = () => {
  isOpen.value = true
}

const onClickOutside = (element: HTMLElement, cb: () => void): void => {
  const handleClick = (event: MouseEvent) => {
    if (!element.contains(event.target as Node)) {
      cb()
    }
  }

  document.addEventListener('click', handleClick)
}

onMounted(() => {
  if (multiDropdown.value) {
    const cleanup = onClickOutside(multiDropdown.value, () => {
      isOpen.value = false
    })

    onUnmounted(() => {
      cleanup
    })
  }
})
</script>

<style scoped>
._package_select_container {
  position: relative;
}

._dynamic_container {
  background: white;
  border: 1px solid gray;
  width: 100%;
  height: 35px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  padding: 4px 10px 4px 10px;
}

._dynamic_search_container {
  position: absolute;
  width: 100%;
  top: 42px;
}

._dynamic_search_input {
  width: 100%;
  background: #f9fafb;
  padding: 7px 10px;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  box-sizing: border-box;
}

._dynamic_drop_down {
  background: rgb(226, 231, 227);
  height: 70px;
  border-width: 1px #d1d5db;
}

._select_placeholder_text {
  color: #9ca3af;
  font-size: 11px;
}

._dynamic_list_container {
  list-style-type: none;
}
</style>
