import { zip } from '../../util/collection'
import { splitPinyin, fromBasic } from '../pinyin'
import { Phrase } from './phrase'

export const getCharacters =
  ({ chinese, pinyin }: Phrase) =>
  zip(chinese.split(''), splitPinyin(pinyin))
    .map(([ chn, pin ]) => ({
      chinese: chn,
      pinyin: fromBasic(pin)
    }))
