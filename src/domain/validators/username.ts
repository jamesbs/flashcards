import { AbstractControl, Validators } from '@angular/forms'

export function validUsername(control: AbstractControl) {
  return [Validators.minLength(4)]
}
