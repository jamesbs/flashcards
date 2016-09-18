import { Component, Input } from '@angular/core'
import { LangItem } from '../../../../../domain/models'
import { Player } from './player'

@Component({
  selector: 'app-action-panel',
  templateUrl: './action-panel.html',
  styleUrls: ['./action-panel.styl'],
  viewProviders: [ Player ]
})
export class ActionPanel {
  @Input() langItem: LangItem

  get externalLink() {
    return 'http://www.collinsdictionary.com/dictionary/chinese-english/' + this.langItem.chinese
  }

  constructor(private player: Player) { }
}
