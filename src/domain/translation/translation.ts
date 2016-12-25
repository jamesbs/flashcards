import { Phrase } from '../lang-item'

export type Translation =
    Phrase
  & {
      english: string | string[]
    }
