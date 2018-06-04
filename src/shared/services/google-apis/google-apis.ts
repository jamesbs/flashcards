import { Injectable, Inject } from '@angular/core'
import { googleApisClientId } from './google-apis-client-id'
import { mergeMap } from 'rxjs/operators'
import { execAsync, lazyAsync } from '../../../util/rxjs'

@Injectable({ providedIn: 'root' })
export class GoogleApis {
  loginUsingGoogle() {
    const scopes = 'profile'

    this.auth2Init
      .subscribe(user => {
        // do something with user
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
    // console.log('auth2 val', gapi.auth2)
    gapi.auth2.getAuthInstance()
      .isSignedIn.listen(res => {
        // console.log('signed in!')
        subject.next(res)
        subject.complete()
      })
  })

  constructor(@Inject(googleApisClientId) private clientId: string) {
    const loadClientSubscription = this.loadClient
      .pipe(mergeMap(() => this.loadAuth2))
      .subscribe(() => {
        loadClientSubscription.unsubscribe()
      })
  }
}
