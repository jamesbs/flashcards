import { Component, Input } from '@angular/core'
import { LangItem } from '../../../../../domain/entities'
import { Player } from './player'

@Component({
  selector: 'app-action-panel',
  templateUrl: './action-panel.component.html',
  styleUrls: ['./action-panel.component.styl'],
  viewProviders: [ Player ]
})
export class ActionPanelComponent {
  @Input() langItem: LangItem

  get externalLink() {
    return `http://www.collinsdictionary.com/dictionary/chinese-english/${this.langItem.chinese}`
  }

  constructor(public player: Player) { }
}
