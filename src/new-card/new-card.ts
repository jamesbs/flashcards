import { Component } from '@angular/core'
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
})
export class NewCard {
  characters: Character[]

  langItem: LangItem = new LangItem()

  constructor(private langItemService: LangItemService) { }

  ngOnInit() {
    this.langItemService.get('1')
      .subscribe(langItem => {
        this.langItem = langItem

        this.characters = getCharacters(langItem)
      })
  }
}
