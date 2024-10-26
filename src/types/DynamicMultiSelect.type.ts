import { Option } from './Util.type'

export interface IDynamicProps {
  data: Option | any
  dynamicListBackgroundColor?: string
  displayKey: string
  displayPrefix?: string
  selectMax?: number | null
  primaryKey: string | number
  imgPrefix: string
  defaultValue?: Object | string[]
}
