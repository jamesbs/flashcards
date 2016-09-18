import { Component, Input, Output, EventEmitter,
  trigger, transition, state, style, animate } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { SlideDirection } from '../play-cards/slide-direction'

@Component({
  selector: 'app-history-panel',
  templateUrl: './history-panel.html',
  styleUrls: [ './history-panel.styl' ],
})
export class HistoryPanel {
  @Input()
  previous: boolean

  @Input()
  next: boolean

  @Output()
  move = new EventEmitter<SlideDirection>()

  echo = Observable.of(1, 2, 3, 4)
    .mergeMap(i => Observable.of(i).delay(500 * i))
    .repeat()

  forward = {
    index: 0,
    mouseout: new EventEmitter<void>(),
    bind: i => {
      console.log('i is', i)
      return this.forward.index = i
    }
  }

  back = {
    index: 0,
    mouseout: new EventEmitter<void>(),
    bind: i => this.back.index = i
  }


  mouseover(target) {
    this.echo
      .delay(260)
      .takeUntil(target.mouseout)
      .subscribe(target.bind)
  }

  mouseout(target) {
    target.mouseout.emit()
    target.index = 0
  }
}
