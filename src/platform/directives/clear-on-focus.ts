import { Directive, HostListener, Input } from '@angular/core'

@Directive({ selector: '[clearOnFocus]' })
export class ClearOnFocus {
  @Input('clearOnFocus') condition: (input?: HTMLInputElement) => boolean = () => true

  @HostListener('focus', ['$event.target'])
  clear(input: HTMLInputElement) {
    if(this.condition(input)) {
      input.value = ''
    }
  }
}
