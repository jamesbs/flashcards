import { Translation } from '../translation'
import { SimpleTranslation } from '../simple-translation'

export class LangItem implements Translation {
  id = ''
  chinese = ''
  pinyin = ''
  english = ''
  examples: SimpleTranslation[] = []
}
