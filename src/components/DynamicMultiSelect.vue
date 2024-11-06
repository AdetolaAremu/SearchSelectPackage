<template>
  <div class="_package_select_container" @click="openDropDown()" ref="multiDropdown">
    <div class="_dynamic_container">
      <div class="_select_placeholder_text">
        <div v-if="transformPickedItems.length !== 0">
          <div class="_slot_content">
            <slot name="dynamicAction" :item="transformPickedItems">
              {{ selectedData.length > 0 ? selectedData.length + ' selected' : 'No selection' }}
            </slot>
          </div>
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
        <transition-group name="list" tag="ul" class="dynamic-list-group">
          <li
            class="_dynamic_list"
            @click="handleItem(option[primaryKey])"
            v-for="(option, index) in filteredData"
            :key="index"
          >
            <div class="_dynamic_checkmark_img" v-if="selectedData.includes(option[primaryKey])">
              <img :src="CheckMark" alt="" style="height: 12px" />
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
        </transition-group>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import CheckMark from '../assets/images/CheckMark.svg'
import Search from '../assets/images/Search.svg'
import { IDynamicProps } from '../types/DynamicMultiSelect.type'
import { Option } from '../types/Util.type'
import { getDisplayValue } from '../util/Helper'
import { onClickOutside } from '../util/Helper'

const props = withDefaults(defineProps<IDynamicProps>(), {
  dynamicListBackgroundColor: '#e5e7eb',
  dynamicInputBorderColour: '1px solid gray',
  dynamicInputFocusBorderColor: '1px solid #6a7ada',
  primaryKey: '',
  modelValue: () => [],
  defaultValue: () => [],
  closeAfterMax: false
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
      emit('update:modelValue', newValue)

      transformPickedItems.value = filterByKey(props.data, newValue, props.primaryKey)

      if (props.closeAfterMax === true && selectedData.value.length == props.selectMax)
        isOpen.value = false
    }
  },
  { deep: true, immediate: true }
)

watch(
  () => props.primaryKey,
  (newValue, oldValue) => {
    if (newValue != oldValue) {
      // if primary key changes, just clear all selections
      selectedData.value = []
    }
  }
)

const filteredData = computed(() => {
  const searchWords = searchTerm.value.toLowerCase().split(' ')

  return props.data.filter((option: Option) => {
    const optionString = Object.values(option).join(' ').toLowerCase()

    return searchWords.every((word) => optionString.includes(word))
  })
})

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
