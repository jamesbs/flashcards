import { AsyncSubject, Observable } from 'rxjs'

export const execAsync = <T>(run: (subject: AsyncSubject<T>) => void) => {
  const subject = new AsyncSubject<T>()
  run(subject)
  return subject
}

export const lazyAsync = <T>(run: (subject: AsyncSubject<T>) => void) => {
  const sub = new AsyncSubject<T>()
  let fired = false

  return Observable.of(sub)
    .flatMap(s => {
      if(!fired) {
        run(s)
        fired = true
      }

      return s
    })
}
