import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'

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
}
