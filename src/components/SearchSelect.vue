<template>
  <div>
    <div
      class="mainContainer"
      ref="dropdown"
      :class="[{ 'drop-select-up': dropUp }, 'base-dropdown']"
    >
      <div :class="{ 'z-10': isOpen }" :id="`${componentId}-search`" class="searchContainer">
        <input
          @input="handleInput"
          @focus="openDropDown"
          @blur="searchTerm = ''"
          :disabled="isDisabled"
          v-model="searchTerm"
          :id="`${componentId}-search`"
          class="inputWrapper"
          :style="{ border: inputStyles }"
          type="text"
          :placeholder="
            selectedData.length > 0 && placeholderName !== ''
              ? selectedData.length.toString() +
                ` ${pluralize(placeholderName, selectedData.length)} Selected`
              : placeholderName === ''
                ? selectedData.length + ' selected'
                : 'Search here'
          "
        />

        <ul
          v-show="isOpen && filteredData.length > 0"
          class="listContainer"
          :aria-labelledby="`${componentId}-input`"
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
                :id="`${componentId}-checkbox-${index}`"
                type="checkbox"
                :value="option"
                class="listInput"
                @click.stop
              />
              <label :for="`${componentId}-checkbox-${index}`" class="listInputLabel">
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
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { searchSelectProps } from '../types/SearchSelect.type'
import { Option } from '../types/Util.type'
import { getDisplayValue } from '../util/Helper'
import { onClickOutside } from '../util/Helper'

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
  closeAfterMax: false,
  isDisabled: false
})

const emit = defineEmits(['update:modelValue'])

const selectedData = ref(
  Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue]
)
const searchTerm = ref('')
const isOpen = ref(false)
const dropdown = ref<HTMLElement | null>(null)
const dropUp = ref(false)
const componentId = ref('dropdown-' + Math.random().toString(36).substring(2, 10))

const openDropDown = async () => {
  if (props.isDisabled) return

  isOpen.value = true

  if (isOpen.value) {
    await nextTick()

    const el = dropdown.value
    if (el) {
      const rect = el.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const dropdownHeight = 48

      dropUp.value = spaceBelow < dropdownHeight
    }
  }
}

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

const clearSelection = () => {
  selectedData.value = []
}

watch(
  () => props.modelValue,
  (newValue) => {
    if (!Array.isArray(newValue)) return

    // we need to make sure data have been selected initially, so we can avoid initialization issue
    if (selectedData.value.length && newValue.length === 0) {
      // once we detect v-model from parent is empty, we need clear selection
      clearSelection()
    }
  },
  { immediate: true }
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
  const searchWords = searchTerm.value.toLowerCase().split(' ')

  return props.data.filter((option: Option) => {
    const optionString = Object.values(option).join(' ').toLowerCase()

    return searchWords.every((word) => optionString.includes(word))
  })
})

const handleInput = (event: Event) => {
  searchTerm.value = (event.target as HTMLInputElement).value
}

const inputStyles = computed(() =>
  isOpen.value === true ? props.inputFocusBorderColor : props.inputBorderColour
)

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
