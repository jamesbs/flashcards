import { Vowel, Tone } from '../../domain/entities'

export interface ToneTable {
  '1': string
  '2': string
  '3': string
  '4': string
  '5'?: string
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
    '5': 'ü',
  }
}

export function applyTone(letter: Vowel, tone: Tone) {
  const found =  pinyinTable[letter][tone]

  return found === undefined
    ? letter
    : found
}
