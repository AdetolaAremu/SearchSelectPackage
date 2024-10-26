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
  modelValue: any[]
  closeAfterMax?: boolean
}
