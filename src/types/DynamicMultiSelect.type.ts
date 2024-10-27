import { Option } from './Util.type'

export interface IDynamicProps {
  data: Option | any
  displayKey: string
  displayPrefix?: string
  selectMax?: number | null
  primaryKey: string | number
  imgPrefix: string
  defaultValue?: Object | string[]
  dynamicListBackgroundColor?: string
  dynamicInputBorderColour?: string
  dynamicInputFocusBorderColor?: string
  modelValue?: any[]
  closeAfterMax?: boolean
}
