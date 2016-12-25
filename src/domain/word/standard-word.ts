import { Word } from './word'
import { toStandard as pinyinToStandard } from '../pinyin/standard'

export type StandardWord = {
  chinese: string
  pinyin: string
}[]

export function toStandard(word: Word) {
  return word.map(({ chinese, pinyin }) => ({
    chinese,
    pinyin: pinyinToStandard(pinyin),
  }))
}
