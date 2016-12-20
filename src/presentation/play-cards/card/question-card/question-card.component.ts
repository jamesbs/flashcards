import { Component, Input } from '@angular/core'
import { LangItem, Character } from '../../../../domain/entities'
import { getCharacters } from '../../../../domain/lang-item'
import { StandardWord, toStandard } from '../../../../view/standard-word'

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.styl'],
})
export class QuestionCardComponent {
  private _langItem: LangItem

  @Input()
  get langItem() {
    return this._langItem
  }

  set langItem(langItem) {
    this._langItem = langItem

    this.characters = toStandard(getCharacters(this.langItem))
  }

  // find a way to implement this as a memoized getter
  characters: StandardWord
}
