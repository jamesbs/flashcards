import { Translation } from '../translation'
import { SimpleTranslation } from '../simple-translation'

export interface LangItem extends Translation {
  id: string
  chinese: string
  pinyin: string
  english: string
  examples: SimpleTranslation[]
}
