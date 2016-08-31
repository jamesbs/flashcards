import { Component, Input } from '@angular/core'
import { LangItem, Word } from '../domain/models'
import { getCharacters } from '../domain/lang-item'

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.html',
  styleUrls: ['./new-card.styl'],
})
export class NewCard {
  private _langItem: LangItem

  @Input()
  get langItem() {
    return this._langItem
  }

  set langItem(langItem) {
    this._langItem = langItem
    this.characters = getCharacters(this.langItem)
  }

  // find a way to implement this as a memoized getter
  characters: Word
}
