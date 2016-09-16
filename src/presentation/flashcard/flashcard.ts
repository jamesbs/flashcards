import { Component,  Input } from '@angular/core'
import { LangItem, Character } from '../../domain/models'
import { getCharacters } from '../../domain/lang-item'
import { toBasic } from '../../domain/pinyin'

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.html',
  styleUrls: [ './flashcard.styl' ]
})
export class Flashcard {
  @Input() private showPinyin: boolean = false

  private _langItem: LangItem

  @Input() get langItem() {
    return this._langItem
  }

  set langItem(langItem) {
    this._langItem = langItem

    this.characters = getCharacters(langItem)
  }

  characters: Character[] = []

  toBasic = toBasic
}
