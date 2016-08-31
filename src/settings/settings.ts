import { Component } from '@angular/core'
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms'
import { validUsername, validEmail } from '../domain/validators'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.html',
  styleUrls: ['./settings.styl'],
})
export class Settings {
  settingsForm: FormGroup

  constructor() {
    this.settingsForm = new FormGroup({
      username: new FormControl('', validUsername),
      email: new FormControl('', validEmail),
    })
  }
}
