import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { LangItem } from '../domain/models'
import { getCharacters } from '../domain/lang-item'

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.html',
  styleUrls: ['./new-card.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewCard {
  @Input() langItem: LangItem

  get characters() {
    return getCharacters(this.langItem)
  }
}
