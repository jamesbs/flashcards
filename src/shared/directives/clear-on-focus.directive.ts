import { Directive, HostListener, Input } from '@angular/core'

@Directive({ selector: '[clearOnFocus]' })
export class ClearOnFocusDirective {
  @Input('clearOnFocus') condition: (input?: HTMLInputElement) => boolean = () => true

  @HostListener('focus', ['$event.target'])
  clear(input: HTMLInputElement) {
    if(this.condition(input)) {
      input.value = ''
    }
  }
}
