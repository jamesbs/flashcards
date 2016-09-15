import { Component } from '@angular/core'
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms'
import { validUsername, validEmail } from '../../domain/validators'
import { URLSearchParams, Http } from '@angular/http'
import { GoogleApis } from '../../common/services/google-apis'

// should be defined in configs not in repo
const clientId = '229587405481-ld3ptvav3bggc4rp1367qqbudqqk9aa0.apps.googleusercontent.com'
const scopes = 'profile'
const apiKey = 'AIzaSyDJDoqCVigIvsDeo7ZmMmJzfbeDApLps20'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.html',
  styleUrls: ['./settings.styl'],
})
export class Settings {
  settingsForm: FormGroup = new FormGroup({
    username: new FormControl('', validUsername),
    email: new FormControl('', validEmail),
  })

  googleAuth() {
    this.googleApis.loginUsingGoogle()
    /*
  gapi.auth2.init({
    client_id: clientId,
    scopes,
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance()
      .isSignedIn.listen((res) => {
        console.log('something happened on signup?', res)
        console.log('prof', res.getBasicProfile())
      })
  });
    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(function(res) {
        console.log('officially signed in!', res)
        console.log('prof', res.getBasicProfile())
      });

    const search = new URLSearchParams()
    search.set('response_type', 'token')
    search.set('client_id', '229587405481-ld3ptvav3bggc4rp1367qqbudqqk9aa0.apps.googleusercontent.com')
    search.set('scope', 'profile')
    search.set('redirect_uri', 'http://flashcards.jamesbs.com:8057/')

    this.http.get(
      'https://accounts.google.com/o/oauth2/v2/auth',
      { search, })
    .subscribe(res => {
      console.log('res', res)
    })
    */
  }

  constructor(private googleApis: GoogleApis) {

  }
}
