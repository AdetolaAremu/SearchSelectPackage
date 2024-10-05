<template>
  <div class="_package_select_container" @click="openDropDown()" ref="multiDropdown">
    <div class="_dynamic_container">
      <div class="_select_placeholder_text">2 selected</div>
    </div>

    <div v-if="isOpen === true">
      <ul
        class="_dynamic_list_container"
        :style="{ 'background-color': dynamicListBackgroundColor }"
      >
        <li>
          <div class="_dynamic_search_container">
            <input placeholder="Search...." class="_dynamic_search_input" type="text" />
          </div>
        </li>
        <li class="_dynamic_list">
          <div class="_dynamic_checkmark_img">
            <img :src="CheckmMark" alt="" style="height: 12px" />
          </div>
          <div class="_dynamic_list_value">Manny packqui</div>
        </li>
      </ul>
    </div>
  </div>
  <!-- once I click on each item, the mark should be shown -->
  <!-- The mark can be shown at the front or back, this should be a feature -->
  <!-- A search icon should be on the right hand side once they click on it, a search input should show -->
  <!-- display key feature -->
  <!-- slots (be able to show anything and make people to be able to do whatever the like and it will be displayed) -->
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import CheckmMark from '../assets/images/CheckMark.svg'

interface IProps {
  dynamicListBackgroundColor: string
}

withDefaults(defineProps<IProps>(), {
  dynamicListBackgroundColor: '#e5e7eb'
})

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
  /* position: absolute; */
  /* width: 100%; */
  top: 10px;
}

._dynamic_search_input {
  width: 100%;
  background: #f9fafb;
  padding: 7px 7px;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  box-sizing: border-box;
}

._select_placeholder_text {
  color: #9ca3af;
  font-size: 11px;
}

._dynamic_list_container {
  list-style-type: none;
  top: 100%;
  position: absolute;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 10px;
  font-size: 0.875rem;
  line-height: 1.25rem;
  max-height: 10rem;
  border-width: 1px #d1d5db;
  border-radius: 0.5rem;
}

._dynamic_list {
  cursor: pointer;
  display: flex;
  padding-top: 20px;
}

._dynamic_list_value {
  margin-left: 10px;
}

._dynamic_checkmark_img {
  margin-top: 2px;
}
</style>
