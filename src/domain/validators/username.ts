import { AbstractControl, Validators } from '@angular/forms'

export function validUsername(control: AbstractControl) {
  return Validators.compose([
    Validators.minLength(4),
  ])
}
