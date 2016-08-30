import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { LangItemService } from '../lang-item/lang-item.service'
import { LangItem, SimpleTranslation, Translation, Character, Word } from '../domain/models'
import { getCharacters, getWords } from '../domain/lang-item'
import { toStandard } from '../domain/pinyin'

const cardFormat = (characters: Character[]) =>
  characters.map(({ chinese, pinyin }) => ({
    chinese,
    pinyin: toStandard(pinyin)
  }))

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

  constructor(private langItemService: LangItemService) { }
}
