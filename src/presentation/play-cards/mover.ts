import { Observable, Subject } from 'rxjs'

import { IntroCardViewModel } from './card/intro-card/intro-card-view-model'

export type Mover = {
  move: () => void,
  id$: Observable<string>
  moveId$: Observable<string>
}

export const createMover = (
  card$: Observable<IntroCardViewModel>,
  getId: (card: IntroCardViewModel) => string) => {

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
