import { Injectable, Inject } from '@angular/core'
import { googleApisClientId } from './google-apis-client-id'

@Injectable()
export class GoogleApis {
  loginUsingGoogle() {
    const scopes = 'profile'

    return new Promise((resolve, reject) => {
        console.log('resolve', resolve, 'reject', reject)
        if(!gapi.auth2) {
          gapi.load('auth2', () => {
            console.log('auth2 done')
            resolve()
          })
        } else {
          console.log('has auth2')
          resolve()
        }
      })
      .then(() => {
        console.log('initializing auth2', this.clientId, scopes)
        return gapi.auth2.init({
          client_id: this.clientId,
          scopes
        })
      })
      .then(() => {
        console.log('attempting to sign in')
        return gapi.auth2.getAuthInstance().signIn()
      })
  }

  constructor(@Inject(googleApisClientId) private clientId: string) {
    gapi.load('client', () => undefined)
  }
}
