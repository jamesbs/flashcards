import { Observable, Subject, range, of, merge } from 'rxjs'
import { mergeAll, mergeMap, repeat, takeUntil, delay, map } from 'rxjs/operators'

import { ngEventHandler } from '../../util/rxjs'

export type Echo = {
  mouseover: () => void
  mouseout: () => void
  effect$: Observable<number>
}

export const createEcho = (): Echo => {
  const echoEffect = range(1, 5)
    .pipe(
      mergeMap(i => of(i).pipe(delay(500 * i))),
      repeat(),
    )

  const { eventStream: mouseoutStream, next: mouseout } = ngEventHandler<void>()
  const { eventStream: mouseoverStream, next: mouseover } = ngEventHandler<void>()

  const def = of(0)

  const effect = merge(
      of(def),
      mouseoverStream.pipe(
        map(() => echoEffect.pipe(takeUntil(mouseoutStream)))),
      mouseoutStream.pipe(map(() => def))
    )
    .pipe(mergeAll())

  return {
    mouseout,
    mouseover,
    effect$: effect,
  }
}
