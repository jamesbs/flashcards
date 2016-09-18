import { Component, Output, HostBinding, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-action',
  templateUrl: './action.html',
  styleUrls: ['./action.styl'],
})
export class ActionView {
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
