import { AbstractControl } from '@angular/forms'

export function validEmail(control: AbstractControl) {
  return emailTest(control.value)
    ? undefined
    : { email: 'Invalid email address' }
}

export function emailTest(input: string) {
  return /^.+@.+\..+$/
}
