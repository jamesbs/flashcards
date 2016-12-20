import { Pinyin, toBasic } from '../../../../../domain/pinyin'
import { Matcher } from '../../../../../shared/components/hinted-input'

// only works for single value pinyin inputs!
export const generatePinyinMatcher: (pinyin: Pinyin) => Matcher =
  (pinyin: Pinyin) => {
    const basicPinyin = toBasic(pinyin)

    return (input, comparison) => input === basicPinyin
  }
