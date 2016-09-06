import { range } from 'lodash'

import { Word } from '../word'
import { SimpleTranslation } from '../simple-translation'
import { splitPinyin, fromBasic } from '../pinyin'

export const getWords = (translation: SimpleTranslation): Word[] => {
  const wordCounts = translation.pinyin.split(' ').map(splitPinyin).map(p => p.length)
  const chineseCharacters = translation.chinese.split('')
  const pinyins = splitPinyin(translation.pinyin)
  const chars = range(pinyins.length)
        .map(index =>({
          chinese: chineseCharacters[index],
          pinyin: fromBasic(pinyins[index])
        }))

  return wordCounts.reduce(
    ({ words, counter }, count) => {
      return {
        words: [ ...words, range(count).map(index => chars[counter + index])] as Word[],
        counter: counter + count
      }
    }, {
      words: [] as Word[],
      counter: 0,
    }).words
}
