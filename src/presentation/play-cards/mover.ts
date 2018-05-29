import { Observable, Subject } from 'rxjs'
import { map, withLatestFrom } from 'rxjs/operators'

import { Historical } from '../../domain/types'

export type Mover = {
  move: () => void,
  id$: Observable<string>
  moveId$: Observable<string>
}

export const createMover = <T extends Historical>(
  card$: Observable<T>,
  getId: (card: Historical) => string): Mover => {

  const move$ = new Subject<void>()
  const move = () => { move$.next() }
  const id$ = card$.pipe(map(getId))

  const moveId$ = move$.pipe(
    withLatestFrom(id$),
    map(([, id]) => id))

  return {
    move,
    id$,
    moveId$,
  }
}
