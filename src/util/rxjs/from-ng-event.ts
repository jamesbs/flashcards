import { Subject } from 'rxjs/Subject'

export type NgEvent<T> = {
  eventStream: Subject<T>
  next: (ev?: T) => void
}
export const ngEventHandler = <T>(): NgEvent<T> => {
  const eventStream = new Subject<T>()
  const next = (ev?: T) => eventStream.next(ev)

  return {
    eventStream,
    next
  }
}
