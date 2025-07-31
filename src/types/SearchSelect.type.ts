import { Option } from './Util.type'

export interface searchSelectProps {
  data: Option | any
  placeholderName?: string
  displayKey: string
  selectMax?: number | null
  defaultValue?: Object | string[]
  listBackgroundColor?: string
  inputBorderColour?: string
  inputFocusBorderColor?: string
  primaryKey: string | number
  isDisabled?: boolean // new
  modelValue?: string[] | number[] | Option[]
  closeAfterMax?: boolean
}
// <SearchSelect
//       :data="pseudoEmployeeData"
//       displayKey="firstName lastName department | employeeId"
//       v-model="employee"
//       primaryKey="firstName"
//     />
