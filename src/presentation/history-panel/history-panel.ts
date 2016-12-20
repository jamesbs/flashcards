import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy,
  trigger, transition, state, style, animate } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'

import { SlideDirection } from '../play-cards/slide-direction'
import { createEcho } from './echo'

@Component({
  selector: 'app-history-panel',
  templateUrl: './history-panel.html',
  styleUrls: [ './history-panel.styl' ],
})
export class HistoryPanelComponent {
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

  forwardEcho = createEcho()

  backwardEcho = createEcho()
}
