import { Card } from './card'
import { LangItem } from '../lang-item'

export interface IntroCard {
  id: string
  type: 'intro'
  langItemId: string
  seen?: Date
  completed?: Date
  previous?: string
  next?: string
}
