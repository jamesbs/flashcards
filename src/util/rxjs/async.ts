import { Observable } from 'rxjs/Observable'
import { AsyncSubject } from 'rxjs/AsyncSubject'
import 'rxjs/add/operator/mergeMap'

export const execAsync = <T>(run: (subject: AsyncSubject<T>) => void) => {
  const subject = new AsyncSubject<T>()
  run(subject)
  return subject
}

export const lazyAsync = <T>(run: (subject: AsyncSubject<T>) => void) => {
  const sub = new AsyncSubject<T>()
  let fired = false

  return Observable.of(sub)
    .mergeMap(s => {
      if(!fired) {
        run(s)
        fired = true
      }

      return s
    })
}
