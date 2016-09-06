import { zip } from '../../util/collection'
import { Translation } from '../translation'
import { splitPinyin, fromBasic } from '../pinyin'

export const getCharacters = (translation: Translation) =>
  zip(translation.chinese.split(''), splitPinyin(translation.pinyin))
    .map(([ chinese, pinyin ]) => ({
      chinese,
      pinyin: fromBasic(pinyin)
    }))
