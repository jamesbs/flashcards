import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy,
  trigger, transition, state, style, animate } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { SlideDirection } from '../play-cards/slide-direction'
import { createEcho } from './echo'

@Component({
  selector: 'app-history-panel',
  templateUrl: './history-panel.component.html',
  styleUrls: [ './history-panel.component.styl' ],
})
export class HistoryPanelComponent {
  @Input()
  previous: Observable<boolean>

  @Input()
  next: Observable<boolean>

  @Input()
  forward = () => { }

  @Input()
  backward = () => { }

  forwardEcho = createEcho()

  backwardEcho = createEcho()
}
