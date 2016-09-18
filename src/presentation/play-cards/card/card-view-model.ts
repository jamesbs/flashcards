import { Card, LangItem } from '../../../domain/models'
import { isIntroCard } from '../../../domain/card'
import { CardViewState } from './card-view-state'
import { IntroCardViewModel, introCardWire } from './intro-card/intro-card-view-model'
import { QuestionCardViewModel } from './question-card'

export type CardViewModel = IntroCardViewModel | QuestionCardViewModel

export const cardWire = (card: Card, { langItem }: { langItem?: LangItem }) => {
  if(isIntroCard(card))
    return introCardWire(card, langItem)
}
