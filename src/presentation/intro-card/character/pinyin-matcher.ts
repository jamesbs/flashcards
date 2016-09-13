import { Pinyin, toBasic } from'../../../domain/pinyin'
import { Matcher } from '../../../common/components/hinted-input'

export const generatePinyinMatcher: (pinyin: Pinyin) => Matcher =
  (pinyin: Pinyin) => {
    const basicPinyin = toBasic(pinyin)

    return value => value === basicPinyin
  }
