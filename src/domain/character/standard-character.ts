import { StandardPinyin, standardFormat, toStandard as pinyinToStandard } from '../pinyin'
import { Chinese } from '../lang-item'
import { Character } from './character'

export type StandardCharacter =
    Chinese
  & StandardPinyin

export const toStandard = ({ chinese, pinyin }: Character) =>
  Object.assign({ chinese }, pinyinToStandard(pinyin))
