import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'
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
}
