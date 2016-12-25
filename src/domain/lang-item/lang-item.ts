import { Translation } from '../translation'
import { Identifiable } from '../types'

export type LangItem =
    Identifiable
  & Translation
  & {
      examples: Translation[]
    }
