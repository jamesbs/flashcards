import { getDirection } from './slide-direction'
import { Card } from '../../domain/entities'

describe('getDirection', () => {
  it('forward', () => {
    const before: Card = {
      id: 'before',
      type: 'intro',
      langItemId: '1',
    }

    const after: Card = {
      id: 'after',
      type: 'intro',
      langItemId: '2',
      previous: 'before',
    }

    expect(getDirection(before, after)).toBe('forward')
  })

  it('backward', () => {
    const before: Card = {
      id: 'before',
      type: 'intro',
      langItemId: '1',
    }
    const after: Card = {
      id: 'after',
      type: 'intro',
      langItemId: '2',
      next: 'before',
    }

    expect(getDirection(before, after)).toBe('backward')
  })

  it('neither', () => {
    const before: Card = {
      id: 'before',
      type: 'intro',
      langItemId: '1',
    }
    const after: Card = {
      id: 'after',
      type: 'intro',
      langItemId: '2',
    }

    expect(getDirection(before, after)).toBe(undefined)
  })
})
