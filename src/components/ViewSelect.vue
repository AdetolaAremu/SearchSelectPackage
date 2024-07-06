<template>
  <div>
    <SearchSelect
      :data="pseudoEmployeeData"
      labelName="Employee"
      :searchTermProp="searchTerm"
      :is-open-prop="isOpen"
      display-key="firstName lastName | employeeId"
      :toggle-dropdown="toggleDropdown"
      :countCondition="2"
      v-model="employee"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SearchSelect from './SearchSelect.vue'

const searchTerm = ref('')
const employee = ref('')
const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

interface IAllEmployees {
  firstName: string
  lastName: string
  department?: string
  dateJoined: string
  employmentType: string
  status?: string
  employeeId?: string
  office?: string
  id?: number
}

const pseudoEmployeeData: IAllEmployees[] = [
  {
    firstName: 'James',
    lastName: 'Polosa',
    department: 'Information Technology',
    dateJoined: '2022-10-22',
    employmentType: 'Full Staff',
    employeeId: 'APN999000',
    office: 'Head of IT',
    id: 12222
  },
  {
    firstName: 'Osho',
    lastName: 'Free',
    department: 'Administrative',
    dateJoined: '2022-10-22',
    employmentType: 'Contract',
    employeeId: 'APN0001',
    office: 'Head of Marketing',
    id: 12223
  },
  {
    firstName: 'Sekoni',
    lastName: 'Oyinda',
    department: 'Customer Experience',
    dateJoined: '2022-10-22',
    employmentType: 'Full Staff',
    employeeId: 'APN0002',
    office: 'Head of HR',
    id: 12224
  }
]
</script>
