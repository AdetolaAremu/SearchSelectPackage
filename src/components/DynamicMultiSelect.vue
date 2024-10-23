<template>
  <div class="_package_select_container" @click="openDropDown()" ref="multiDropdown">
    <div class="_dynamic_container">
      <div class="_select_placeholder_text">
        <div v-if="transformPickedItems.length !== 0">
          <slot name="dynamicAction" :item="transformPickedItems">
            {{ selectedData.length > 0 ? selectedData.length + ' selected' : 'No selection' }}
          </slot>
        </div>
        <div v-else>No Selection</div>
      </div>
    </div>

    <div v-if="isOpen === true">
      <ul
        class="_dynamic_list_container"
        :style="{ 'background-color': dynamicListBackgroundColor }"
      >
        <li class="_dynamic_search_list_container">
          <div class="dynamic_search_input_container">
            <div @click="toggleSearchInput()">
              <img :src="Search" alt="search" style="height: 20px; margin-top: 7px" />
            </div>
          </div>

          <div class="_dynamic_search_container" v-if="isSearchInputVisible">
            <input
              v-model="searchTerm"
              placeholder="Search..."
              class="_dynamic_search_input"
              type="text"
            />
          </div>
        </li>
        <li
          class="_dynamic_list"
          @click="handleItem(option[primaryKey])"
          v-for="(option, index) in filteredData"
          :key="index"
        >
          <div class="_dynamic_checkmark_img" v-if="selectedData.includes(option[primaryKey])">
            <img :src="CheckmMark" alt="" style="height: 12px" />
          </div>

          <div class="_dynamic_list_value">
            <div class="_list_prefix_container">
              <div v-if="imgPrefix">
                <img :src="option[imgPrefix]" alt="" class="_dyamic_prefix_image_src" />
              </div>

              <slot v-else name="listClassPrefix" :item="option" />
            </div>

            <div>
              {{ getDisplayValue(option, displayKey) }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <!-- Max select | Done -->
  <!-- NOTE: the prefix can either be an image or a class | done -->
  <!-- if items inside that box is too long then make it scrollable | done -->
  <!-- A search icon should be on the right hand side once they click on it, a search input should show | done -->
  <!-- slots (be able to show anything and make people to be able to do whatever the like and it will be displayed) | done -->
  <!-- default value -->
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import CheckmMark from '../assets/images/CheckMark.svg'
import Search from '../assets/images/Search.svg'
import { Option } from '../types/SearchSelect.type'

interface IProps {
  data: Option | any
  dynamicListBackgroundColor?: string
  displayKey: string
  displayPrefix?: string
  selectMax?: number | null
  primaryKey: string | number
  imgPrefix: string
  defaultValue?: Object | string[]
}

const props = withDefaults(defineProps<IProps>(), {
  dynamicListBackgroundColor: '#e5e7eb',
  primaryKey: '',
  defaultValue: () => []
})

const isOpen = ref(false)
const multiDropdown = ref<HTMLElement | null>(null)
const searchTerm = ref('')
const selectedData = ref(
  Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue]
)
const isSearchInputVisible = ref<boolean>(false)
const transformPickedItems = ref<any[]>([])
const emit = defineEmits(['update:modelValue'])

const openDropDown = () => (isOpen.value = true)

const toggleSearchInput = () => {
  isSearchInputVisible.value = !isSearchInputVisible.value
}

const onClickOutside = (element: HTMLElement, cb: () => void): void => {
  const handleClick = (event: MouseEvent) => {
    if (!element.contains(event.target as Node)) {
      cb()
    }
  }

  document.addEventListener('click', handleClick)
}

const selectDefaultItems = async () => {
  if (props.defaultValue) {
    const defaultValues = Array.isArray(props.defaultValue)
      ? props.defaultValue
      : [props.defaultValue]

    const defaultSelection = props.data.filter((item: Option) =>
      defaultValues.some((value) => value === item[props.primaryKey])
    )

    let keepPrimaryKeys: (string | number)[] = []

    keepPrimaryKeys = defaultSelection.map((item: Option) => {
      return item[props.primaryKey]
    })

    selectedData.value = keepPrimaryKeys

    transformPickedItems.value = filterByKey(props.data, selectedData.value, props.primaryKey)
  }
}

const handleItem = (item: string | number) => {
  if (
    props.selectMax !== null &&
    selectedData.value.length === props.selectMax &&
    !selectedData.value.includes(item)
  )
    return

  if (selectedData.value.includes(item)) {
    selectedData.value = selectedData.value.filter((i) => i !== item)
  } else {
    selectedData.value.push(item)
  }
}

const filterByKey = (data: any[], newValue: any[], primaryKey: string | number) => {
  return data.filter((item: any) => newValue.includes(item[primaryKey]))
}

watch(
  selectedData,
  (newValue) => {
    if (Array.isArray(newValue)) {
      // console.log('nuu value', newValue)
      emit('update:modelValue', newValue)

      transformPickedItems.value = filterByKey(props.data, newValue, props.primaryKey)
    }
  },
  { deep: true, immediate: true }
)

const transformPickedData = (newValue: any[]) => {
  props.data.filter((item: any) => {
    return newValue.includes(item[props.primaryKey])
  })
}

const filteredData = computed(() => {
  return props.data.filter((option: Option) => {
    return Object.values(option).some((value) =>
      String(value).toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  })
})

const getDisplayValue = (option: { [key: string]: any }, displayKey: string) => {
  return displayKey.replace(/\b(\w+)\b/g, (match) => option[match] || match)
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

  selectDefaultItems()
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
  max-height: 35px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  padding: 4px 10px 4px 10px;
  overflow-x: auto;
  white-space: nowrap;
}

._dynamic_search_container {
  top: 10px;
  width: 100%;
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
  padding-top: 13px;
}

._dynamic_list_value {
  margin-left: 10px;
  display: flex;
}

._dynamic_checkmark_img {
  margin-top: 2px;
  margin-left: 8px;
}

._dynamic_list:hover {
  background: #ecedef;
}

._dynamic_search_list_container {
  padding: 5px;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  width: 100%;
}

.dynamic_search_input_container {
  margin-right: 3px;
}

._dyamic_prefix_image_src {
  height: 20px;
  width: 20px;
  border-radius: 9999px;
}

._list_prefix_container {
  margin-right: 5px;
}
</style>
