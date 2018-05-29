import { Observable, AsyncSubject, of } from 'rxjs'
import { mergeMap } from 'rxjs/operators'

export const execAsync = <T>(run: (subject: AsyncSubject<T>) => void) => {
  const subject = new AsyncSubject<T>()
  run(subject)
  return subject
}

export const lazyAsync = <T>(run: (subject: AsyncSubject<T>) => void) => {
  const sub = new AsyncSubject<T>()
  let fired = false

  return of(sub)
    .pipe(mergeMap(s => {
      // FIX: side effect within mergeMap
      if(!fired) {
        run(s)
        fired = true
      }

      return s
    }))
}
