import { Card } from '../../domain/models'

export type SlideDirection = 'forward' | 'backward'

export const getDirection = (before: Card, after: Card) =>
  after.previous === before.id ? 'forward' : 'backward'
