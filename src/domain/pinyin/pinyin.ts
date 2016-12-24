import { Tone } from '../tone'

export type Pinyin = Readonly<{
  syllable: string
  tone: Tone
}>
