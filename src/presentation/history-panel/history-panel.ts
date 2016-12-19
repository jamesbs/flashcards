import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy,
  trigger, transition, state, style, animate } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'

import { SlideDirection } from '../play-cards/slide-direction'
import { MoveAnimation } from './move-animation'


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

  @Input()
  forward = () => { }

  @Input()
  backward = () => { }

  echo = Observable.of(1, 2, 3, 4)
    .mergeMap(i => Observable.of(i).delay(500 * i))
    .repeat()


  /* Animation State */
  backAnimation: MoveAnimation = {
    index: 0,
    mouseout: new EventEmitter<void>(),
    bind: (i: number) => {
      this.backAnimation.index = i
    }
  }

  /* Animation State */
  forwardAnimation: MoveAnimation = {
    index: 0,
    mouseout: new EventEmitter<void>(),
    bind: (i: number) => this.forwardAnimation.index = i
  }

  mouseover(target: MoveAnimation) {
    this.echo
      .delay(260)
      .takeUntil(target.mouseout)
      .subscribe(target.bind)
  }

  mouseout(target: MoveAnimation) {
    target.mouseout.emit()
    target.index = 0
  }
}
