import { Component,  Input } from '@angular/core'
import { LangItem, Character } from '../domain/models'
import { getCharacters } from '../domain/lang-item'
import { toBasic } from '../domain/pinyin'

@Component({
    selector: 'flashcard',
    templateUrl: './flashcard.html',
    styleUrls: [ './flashcard.styl' ]
})
export class Flashcard {
  @Input() private characters: Character[] = []
  @Input() private showPinyin: boolean = false

  toBasic = toBasic
}
