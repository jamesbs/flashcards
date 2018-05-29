import { Component, HostBinding, OnInit } from '@angular/core'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.styl'],
})
export class ActionComponent implements OnInit {
  hovered$ = new Subject<boolean>()

  @HostBinding('class.show-tooltip')
  showTooltip = false

  ngOnInit() {
    this.hovered$.pipe(debounceTime(200))
      .subscribe(hovered => {
        this.showTooltip = hovered
      })
  }
}
