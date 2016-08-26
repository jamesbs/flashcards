import { ValueError } from '../error/index'
import { Tone, isTone } from './tone'
import { Vowel, isVowel, isPriorityVowel } from './vowel'

export type Pinyin = {
  syllable: string
  tone: Tone
}

/** Splits a string of pinyin into a flat array of each syllable */
export const splitPinyin = (pinyin: string) => {
  let index = 0
  let pinyins: string[] = []
  let current = ''

  pinyin.split(/(\d)/)
    .filter(token => token !== '')
    .map(token => token.trim())
    .forEach(token => {
      if(index === 0) {
        current = token
        index = 1
      } else {
        pinyins.push(current + token)
        index = 0
      }
    })

  return pinyins
}

export const fromBasic = (basic: string): Pinyin => {
  const normalized = basic.trim()
  const tone = normalized.slice(-1)

  if(!isTone(tone)) {
    throw new ValueError(basic + ' is not valid pinyin.')
  } else {
    return {
      syllable: normalized.slice(0, -1),
      tone: <Tone>tone
    }
  }
}
export const toBasic = (pinyin: Pinyin) => pinyin.syllable + pinyin.tone

export const toStandard = (pinyin: Pinyin) => {
  if (pinyin.tone === '5') {
    return pinyin.syllable
  } else {
    const matchingIndex = findApplyIndex(pinyin.syllable)(pinyin.syllable.length - 1)

    const res =  pinyin.syllable.slice(0, matchingIndex)
         + applyTone(pinyin.syllable[matchingIndex] as Vowel, pinyin.tone)
         + pinyin.syllable.slice(matchingIndex + 1)

    return res
  }
}

export function applyTone(letter: Vowel, tone: Tone) {
  return pinyinTable[letter][tone]
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

  return matchingIndex
}

export interface ToneTable {
  '1': string
  '2': string
  '3': string
  '4': string
}


export const pinyinTable: { [key: string]: ToneTable } = {
  'a': {
    '1': 'ā',
    '2': 'á',
    '3': 'ǎ',
    '4': 'à',
  },
  'e': {
    '1': 'ē',
    '2': 'é',
    '3': 'ě',
    '4': 'è',
  },
  'i': {
    '1': 'ī',
    '2': 'í',
    '3': 'ǐ',
    '4': 'ì',
  },
  'o': {
    '1': 'ō',
    '2': 'ó',
    '3': 'ǒ',
    '4': 'ò',
  },
  'u': {
    '1': 'ū',
    '2': 'ú',
    '3': 'ǔ',
    '4': 'ù',
  },
  'v': {
    '1': 'ǖ',
    '2': 'ǘ',
    '3': 'ǚ',
    '4': 'ǜ',
  }
}
