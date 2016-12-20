import { Card } from '../../domain/entities'


export type SlideDirection = 'forward' | 'backward'

export const getDirection = (before: Card, after: Card) => {
  if (after.previous === before.id)
    return 'forward'
  else if (after.next === before.id)
    return 'backward'
  else
    return undefined
}


export const gd = (source: { previous?: string, next?: string}, targetId: string) => {
  if (source.next === targetId)
    return 'forward'
  else if (source.previous === targetId)
    return 'backward'
  else
    return undefined
}
