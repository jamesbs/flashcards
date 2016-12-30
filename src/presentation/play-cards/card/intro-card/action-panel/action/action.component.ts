import { Component, Output, HostBinding } from '@angular/core'
import { Subject } from 'rxjs/Subject'

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.styl'],
})
export class ActionComponent {
  hovered$ = new Subject<boolean>()

  @HostBinding('class.show-tooltip')
  showTooltip = false

  ngOnInit() {
    this.hovered$.debounceTime(200)
      .subscribe(hovered => {
        this.showTooltip = hovered
      })
  }
}
