import { Pinyin } from './pinyin'
import { Vowel, isVowel, isPriorityVowel } from './vowel'
import { applyTone } from './pinyin-tone'

export const toStandard = (pinyin: Pinyin) => {
    const matchingIndex = findApplyIndex(pinyin.syllable)

    return pinyin.syllable.slice(0, matchingIndex)
         + applyTone(pinyin.syllable[matchingIndex] as Vowel, pinyin.tone)
         + pinyin.syllable.slice(matchingIndex + 1)
}

export function findApplyIndex(syllable: string) {
  let matchingVowelIndex = -1

  const matchVowel = (letter: Vowel, index: number) => {
    if(isPriorityVowel(letter)) {
      return index
    } else {
      return matchingIndex(index - 1)
    }
  }

  const matchConsonant = (letter: string, index: number)=> {
    if(matchingVowelIndex === -1) {
      return matchingIndex(index - 1)
    } else {
      return matchingVowelIndex
    }
  }

  const matchingIndex = (index: number) => {
    const letter = syllable[index]
    if(isVowel(letter)) {
      if(matchingVowelIndex === -1) {
        matchingVowelIndex = index
      }
      return matchVowel(letter as Vowel, index)
    } else if(index < 0) {
      return matchingVowelIndex
    } else {
      return matchConsonant(letter, index)
    }
  }

  return matchingIndex(syllable.length - 1)
}
