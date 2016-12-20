import { Component, Output, HostBinding, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.styl'],
})
export class ActionComponent {
  @Output()
  iconHover = new EventEmitter<boolean>()


  @HostBinding('class.hovered')
  hovered = false

  ngOnInit() {
    this.iconHover.debounceTime(200)
      .subscribe(hovered => {
        this.hovered = hovered
      })
  }
}
