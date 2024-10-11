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
        <li
          class="_dynamic_list"
          @click="handleItem(option[primaryKey], index)"
          v-for="(option, index) in filteredData"
          :key="index"
        >
          <div class="_dynamic_checkmark_img" v-if="selectedData.includes(option[primaryKey])">
            <img :src="CheckmMark" alt="" style="height: 12px" />
          </div>
          <div class="_dynamic_list_value">
            {{ getDisplayValue(option, displayKey) }}
          </div>
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
import { computed, onMounted, onUnmounted, ref } from 'vue'
import CheckmMark from '../assets/images/CheckMark.svg'
import { Option } from '../types/SearchSelect.type'

interface IProps {
  data: Option | any
  dynamicListBackgroundColor?: string
  displayKey: string
  selectMax?: number | null
  primaryKey: string | number
}

const props = withDefaults(defineProps<IProps>(), {
  dynamicListBackgroundColor: '#e5e7eb',
  primaryKey: 'id'
})

const isOpen = ref(false)
const multiDropdown = ref<HTMLElement | null>(null)
const searchTerm = ref('')
const selectedData = ref<any[]>([])

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

const handleItem = (item: string | number, index: number) => {
  console.log(item, 'iteeeem')
  console.log(index, 'number')

  // we need to store in in an array
  selectedData.value?.push(item)

  console.log('selected data', selectedData.value)
}

const filteredData = computed(() => {
  // harmonized
  return props.data.filter((option: Option) => {
    return Object.values(option).some((value) =>
      String(value).toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  })
})

const getDisplayValue = (option: { [key: string]: any }, displayKey: string) => {
  return displayKey.replace(/\b(\w+)\b/g, (match) => option[match] || match)
}

// pick and only when picked should that check mark show

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
  overflow-y: auto;
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
