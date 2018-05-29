import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core'
import { trigger, transition, state, style, animate } from '@angular/animations'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'

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
