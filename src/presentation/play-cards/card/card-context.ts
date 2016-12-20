import { Card, LangItem } from '../../../domain/entities'
import { Historical, Typed } from '../../../domain/types'
import { asHistorical } from '../../../domain/types/historical'
import { asTyped } from '../../../domain/types/typed'

export type CardContext =
    Historical
  & Typed<'intro' | 'question'>
  & {
      langItem: LangItem
    }

export const createCardContext = (
  card: Card,
  langItem: LangItem): CardContext => {

  return Object.assign(
    asHistorical(card),
    asTyped(card),
    { langItem })
}
