import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'
import { HistoryPanelMovement } from './history-panel-movement'

@Component({
  selector: 'app-history-panel',
  templateUrl: './history-panel.html',
  styleUrls: [ './history-panel.styl' ],
})
export class HistoryPanel {
  @Input()
  previous: string

  @Input()
  next: string

  @Output()
  move = new EventEmitter<HistoryPanelMovement>()

  back() {
    this.move.emit('back')
    this.router.navigate([ '/play', this.back ])
  }

  forward() {
    this.move.emit('forward')
    this.router.navigate([ '/play', this.next ])
  }

  constructor(private router: Router) { }
}
