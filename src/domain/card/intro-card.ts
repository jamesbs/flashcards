import { Card } from './card'
import { LangItem } from '../lang-item'
import { Identifiable, Historical, Typed } from '../types'

export type IntroCard =
    Identifiable
  & Historical
  & Typed<'intro'>
  & {
      langItemId: string
    }

export const isIntroCard = (card: Card): card is IntroCard => card.type === 'intro'
