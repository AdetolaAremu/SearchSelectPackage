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
              : 'Search...'
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
                  countCondition !== null &&
                  selectedData.length >= countCondition &&
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
import { computed, onMounted, onUnmounted, ref, watch, type PropType } from 'vue'

type Option<T = unknown> = { id: T; [key: string]: unknown }

const props = defineProps({
  data: {
    type: Array as PropType<Option[] | any>,
    required: true
  },
  placeholderName: {
    type: String,
    default: null
  },
  searchTermProp: {
    type: String,
    required: true
  },
  isOpenProp: {
    type: Boolean,
    required: false
  },
  displayKey: {
    type: String,
    required: true
  },
  separator: {
    type: String,
    default: ''
  },
  countCondition: {
    type: Number,
    default: null
  },
  defaultValue: {
    type: [Object, Array],
    default: () => []
  },
  listBackgroundColor: {
    type: String,
    default: '#e5e7eb'
  },
  inputBorderColour: {
    type: String,
    default: '1px solid gray'
  },
  inputFocusBorderColor: {
    type: String,
    default: '1px solid #6a7ada'
  }
})

const emit = defineEmits(['update:modelValue'])

const selectedData = ref(
  Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue]
)
const searchTerm = ref(props.searchTermProp)
const isOpen = ref(props.isOpenProp)
const dropdown = ref<HTMLElement | null>(null)

watch(selectedData, (newValue: string | object) => {
  if (Array.isArray(newValue)) {
    const getValue = newValue.map((item) => item.id)
    emit('update:modelValue', getValue)
  } else {
    emit('update:modelValue', newValue)
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
  return displayKey
    .split(' ')
    .map((key) => option[key])
    .join(' ')
}

const onClickOutside = (element: HTMLElement, cb: () => void): void => {
  const handleClick = (event: MouseEvent) => {
    if (!element.contains(event.target as Node)) {
      cb()
    }
  }

  document.addEventListener('click', handleClick)

  // if (isOpen.value === false) { // we need to remove this click event
  //   document.removeEventListener('click', handleClick)
  // }
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

<style scoped>
* {
  box-sizing: border-box;
}

.mainContainer {
  position: relative;
  margin-top: 10px;
  width: 100%;
}

.searchContainer {
  background: white;
  box-shadow: #0000;
  position: relative;
  width: 100%;
}

.inputWrapper {
  border-radius: 0.5rem;
  padding: 9px;
  font-size: 11px;
  background: #f9fafb;
  color: #9ca3af;
  border: 1px solid #d1d5db;
  width: 100%;
  outline: none;
}

.listContainer {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  width: 100%;
  border-width: 1px #d1d5db;
  border-radius: 0.5rem;
  box-shadow: #0000;
  overflow-y: auto;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: black;
  max-height: 10rem;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.listBox {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.25rem;
}

.listBox:hover {
  background: #ecedef;
}

.listInput {
  width: 1rem;
  height: 1rem;
  padding: 0.5rem;
  background-color: #f3f4f6;
  border-color: #d1d5db;
  border-radius: 0.25rem;
}

.listInput:focus {
  outline: 2px solid #3b82f6;
}

.listInputLabel {
  width: 100%;
  margin-inline-start: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: #111827;
  border-radius: 0.25rem;
  text-transform: capitalize;
}
</style>
