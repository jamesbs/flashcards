import { LangItem, IntroCard } from '../../domain/models'
import { CardViewModel } from './card-view-model'

export interface IntroCardViewModel {
  id: string
  type: 'intro'
  langItem?: LangItem
  seen?: Date
  completed?: Date
  previous?: string
  next?: string
}

export const introCardWire: (card: IntroCard, langItem: LangItem) => IntroCardViewModel
  = (card: IntroCard, langItem: LangItem) =>
    ({
      id: card.id,
      type: card.type,
      langItem,
      seen: card.seen,
      completed: card.completed,
      previous: card.previous,
      next: card.next,
    })

export const introCardViewModelWire: (introCardViewModel: IntroCardViewModel) => IntroCard
  = (introCardViewModel: IntroCardViewModel) => ({
    id: introCardViewModel.id,
    type: introCardViewModel.type,
    langItemId: introCardViewModel.langItem.id,
    seen: introCardViewModel.seen,
    completed: introCardViewModel.completed,
    previous: introCardViewModel.previous,
    next: introCardViewModel.next,
  })
