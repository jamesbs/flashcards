import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/map'

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
  const id$ = card$.map(getId)

  const moveId$ = move$.withLatestFrom(id$)
    .map(([, id]) => id)

  return {
    move,
    id$,
    moveId$
  }
}
