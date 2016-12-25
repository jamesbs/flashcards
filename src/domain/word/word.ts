import { range } from 'lodash'

import { Character } from '../character'
import { Phrase } from '../lang-item'
import { splitPinyin, fromBasic } from '../pinyin'

export type Word = Character[]

export const fromPhrase = ({ pinyin, chinese }: Phrase): Word[] => {
  const wordCounts = pinyin.split(' ').map(splitPinyin).map(p => p.length)
  const chineseCharacters = chinese.split('')
  const pinyins = splitPinyin(pinyin)
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
