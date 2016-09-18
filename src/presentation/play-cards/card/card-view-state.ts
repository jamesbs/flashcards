import { CardActivity } from './card-activity'
import { CardViewModel } from './card-view-model'

export interface CardViewState {
  activity: CardActivity
}

export const setActivity = (card: CardViewModel, activity: CardActivity) =>
  Object.assign(card, { activity } as CardViewState)
