import { Directive } from '@angular/core'
import { FormControlName } from '@angular/forms'

@Directive({ selector: '[resetIfEmpty]' })
export class ResetIfEmpty {
  constructor(private fcn: FormControlName) { }

  ngAfterViewInit() {
    console.log('fcn', this.fcn)
  }
}
