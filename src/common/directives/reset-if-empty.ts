import { Directive, HostListener, Input } from '@angular/core'

@Directive({ selector: '[resetIfEmpty]' })
export class ResetIfEmpty {
  @Input('resetIfEmpty') resetValue: string

  @HostListener('blur', ['$event.target'])
  resetIfEmpty(input: HTMLInputElement) {
    if (!input.value)
      input.value = this.resetValue
  }
}
