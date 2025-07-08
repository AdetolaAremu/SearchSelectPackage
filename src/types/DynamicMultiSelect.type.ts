import { Option } from './Util.type'

type SearchApiFunction = (searchTerm: string) => Promise<any[]>

export interface IDynamicProps {
  data?: Option | any
  displayKey: string
  displayPrefix?: string
  selectMax?: number | null
  primaryKey: string | number
  imgPrefix?: string
  defaultValue?: Object | string[]
  dynamicListBackgroundColor?: string
  dynamicInputBorderColour?: string
  dynamicInputFocusBorderColor?: string
  modelValue?: any[]
  closeAfterMax?: boolean
  searchApi?: SearchApiFunction | null
  showOnSearch?: boolean
  debounceApiCallBy?: number
  isDisabled?: boolean
}
