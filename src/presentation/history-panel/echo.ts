import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/mergeAll'
import 'rxjs/add/observable/range'
import 'rxjs/add/operator/mergeMap'

import { ngEventHandler } from '../../util/rxjs'

export type Echo = {
  mouseover: () => void
  mouseout: () => void
  effect$: Observable<number>
}

export const createEcho = (): Echo => {
  const echoEffect = Observable.range(1, 5)
    .mergeMap(i => Observable.of(i).delay(500 * i))
    .repeat()

  const { eventStream: mouseoutStream, next: mouseout } = ngEventHandler<void>()
  const { eventStream: mouseoverStream, next: mouseover } = ngEventHandler<void>()

  const def = Observable.of(0)

  const effect = Observable.merge(
      Observable.of(def),
      mouseoverStream.map(() => echoEffect.takeUntil(mouseoutStream)),
      mouseoutStream.map(() => def))
    .mergeAll()

  return {
    mouseout,
    mouseover,
    effect$: effect,
  }
}
