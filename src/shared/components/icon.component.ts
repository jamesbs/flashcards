import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-icon',
  template: `
    <img *ngIf="src" src="src" />
  `,
})
export class IconComponent {
  @Input()
  src = ''
}
