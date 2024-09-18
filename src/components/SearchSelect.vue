<template>
  <div>
    <div class="mainContainer" ref="dropdown">
      <div :class="{ 'z-10': isOpen }" id="dropdownSearch" class="searchContainer">
        <input
          @input="handleInput"
          @focus="isOpen = true"
          @blur="searchTerm = ''"
          v-model="searchTerm"
          id="dropdownSearchInput"
          class="inputWrapper"
          :style="{ border: inputStyles }"
          type="text"
          :placeholder="
            selectedData.length > 0
              ? selectedData.length.toString() +
                ` ${pluralize(placeholderName, selectedData.length)} Selected`
              : 'Search here'
          "
        />

        <ul
          v-show="isOpen && filteredData.length > 0"
          class="listContainer"
          aria-labelledby="dropdownSearchInput"
          :style="{ 'background-color': listBackgroundColor }"
        >
          <li v-for="(option, index) in filteredData" :key="index">
            <div class="listBox">
              <input
                :disabled="
                  selectMax !== null &&
                  selectedData.length >= selectMax &&
                  !selectedData.includes(option)
                "
                v-model="selectedData"
                :id="'checkbox-item-' + index"
                type="checkbox"
                :value="option"
                class="listInput"
              />
              <label :for="'checkbox-item-' + index" class="listInputLabel">
                {{ getDisplayValue(option, displayKey) }}
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { searchSelectProps, Option } from '../types/SearchSelect.type'

const props = withDefaults(defineProps<searchSelectProps>(), {
  data: [],
  placeholderName: '',
  displayKey: '',
  selectMax: null,
  defaultValue: () => [],
  listBackgroundColor: '#e5e7eb',
  inputBorderColour: '1px solid gray',
  inputFocusBorderColor: '1px solid #6a7ada',
  primaryKey: '',
  modelValue: () => [],
  closeAfterMax: false
})

const emit = defineEmits(['update:modelValue'])

const selectedData = ref(
  Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue]
)
const searchTerm = ref('')
const isOpen = ref(false)
const dropdown = ref<HTMLElement | null>(null)

const selectDefaultItems = () => {
  if (props.defaultValue) {
    const defaultValues = Array.isArray(props.defaultValue)
      ? props.defaultValue
      : [props.defaultValue]

    const defaultSelection = props.data.filter((item: Option) =>
      defaultValues.some((value) => value === item[props.primaryKey])
    )

    selectedData.value = defaultSelection
  }
}

watch(
  () => props.modelValue,
  (newValue) => {
    // we need to make sure data have been selected initially, so we can avoid initialization issue
    if (selectedData.value.length) {
      if (!newValue.length) {
        // once we detect v-model from parent is empty, we need clear selection
        clearSelection()
      }
    }
  },
  { immediate: true }
)

const clearSelection = () => {
  selectedData.value = []
}

watch(
  () => props.primaryKey,
  (newValue, oldValue) => {
    if (newValue != oldValue) {
      // if primary key changes, just clear all selections
      selectedData.value = []
    }
  }
)

watch(
  selectedData,
  (newValue) => {
    if (Array.isArray(newValue)) {
      const getValue = newValue.map((item) => item[props.primaryKey])
      emit('update:modelValue', getValue)
    }
  },
  { deep: true, immediate: true }
)

watch(selectedData, () => {
  if (props.closeAfterMax === true && selectedData.value.length == props.selectMax) {
    isOpen.value = false
  }
})

const filteredData = computed(() => {
  return props.data.filter((option: Option) => {
    return Object.values(option).some((value) =>
      String(value).toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  })
})

const handleInput = (event: Event) => {
  searchTerm.value = (event.target as HTMLInputElement).value
}

const inputStyles = computed(() =>
  isOpen.value === true ? props.inputFocusBorderColor : props.inputBorderColour
)

const getDisplayValue = (option: { [key: string]: any }, displayKey: string) => {
  return displayKey.replace(/\b(\w+)\b/g, (match) => option[match] || match)
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
  if (dropdown.value) {
    const cleanup = onClickOutside(dropdown.value, () => {
      isOpen.value = false
    })

    onUnmounted(() => {
      cleanup
    })
  }

  selectDefaultItems()
})

const pluralize = (word: string, count: number) => {
  if (count === 1) {
    return word
  }

  if (
    word.endsWith('y') &&
    !word.endsWith('ay') &&
    !word.endsWith('ey') &&
    !word.endsWith('iy') &&
    !word.endsWith('oy') &&
    !word.endsWith('uy')
  ) {
    return word.slice(0, -1) + 'ies'
  } else if (
    word.endsWith('s') ||
    word.endsWith('sh') ||
    word.endsWith('ch') ||
    word.endsWith('x') ||
    word.endsWith('z')
  ) {
    return word + 'es'
  } else {
    return word + 's'
  }
}
</script>
