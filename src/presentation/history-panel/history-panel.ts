import { Component, Input } from '@angular/core'

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
