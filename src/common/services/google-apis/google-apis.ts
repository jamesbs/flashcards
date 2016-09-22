import { Injectable, Inject } from '@angular/core'
import { googleApisClientId } from './google-apis-client-id'
import { AsyncSubject, Subject, BehaviorSubject, Observable, Subscriber } from 'rxjs'

const execAsync = <T>(run: (subject: AsyncSubject<T>) => void) => {
  const subject = new AsyncSubject<T>()
  run(subject)
  return subject
}

const lazyAsync = <T>(run: (subject: AsyncSubject<T>) => void) => {
  const sub = new AsyncSubject<T>()
  let fired = false

  return Observable.of(sub)
    .flatMap(s => {
      if (!fired) {
        run(s)
        fired = true
      }

      return s
    })
}

@Injectable()
export class GoogleApis {
  loginUsingGoogle() {
    const scopes = 'profile'

    this.auth2Init
      .subscribe(user => {
        console.log('user', user)
      })
  }

  loadClient = execAsync(subject => {
    gapi.load('client', () => {
      subject.next(undefined)
      subject.complete()
    })
  })

  loadAuth2 = lazyAsync(subject => {
      gapi.load('auth2', () => {
        subject.next(undefined)
        subject.complete()
      })
    })

  auth2Init = lazyAsync(subject => {
      gapi.auth2.init(this.auth2Config)
        .then((...args) => {
          subject.next(args)
          subject.complete()
        })
    })

  auth2Config = { client_id: this.clientId, scopes: 'profile' }

  getAuthInstance = lazyAsync(subject => {
    console.log('auth2 val', gapi.auth2)
    gapi.auth2.getAuthInstance()
      .isSignedIn.listen(res => {
        console.log('signed in!')
        subject.next(res)
        subject.complete()
      })
  })

  constructor(@Inject(googleApisClientId) private clientId: string) {
    const loadClientSubscription = this.loadClient
      .mergeMap(() => this.loadAuth2)
      .subscribe(() => {
        loadClientSubscription.unsubscribe()
      })
  }
}
