import { Word } from './word'
import { StandardCharacter, toStandard as characterToStandard } from '../character'
import { standardFormat } from '../pinyin/standard'

export type StandardWord = StandardCharacter[]

export const toStandard = (word: Word) =>
  word.map(characterToStandard)
