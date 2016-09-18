import { Card } from '../../domain/models'

export type SlideDirection = 'forward' | 'backward'

export const getDirection = (before: Card, after: Card) => {
  if (after.previous === before.id)
    return 'forward'
  else if (after.next === before.id)
    return 'backward'
  else
    return undefined
}
