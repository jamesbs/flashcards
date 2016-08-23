import { Component } from '@angular/core'
import { LangItemService } from '../lang-item/lang-item.service'
import { LangItem, SimpleTranslation, Translation, Character, Word } from '../domain/models'
import { getCharacters, getWords } from '../domain/lang-item'
import { toStandard } from '../domain/pinyin'

interface ExampleView {
  words: {
    chinese: string,
    pinyin: string
  }[][]
  english: string
}

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.html',
  styleUrls: [ './new-card.styl' ],
})
export class NewCard {
  characters: {
    chinese: string,
    pinyin: string,
  }[]

  langItem: LangItem = new LangItem()
  examples: ExampleView[] = []
  
  pinyinDisplay = toStandard

  constructor(private langItemService: LangItemService) { }

  ngOnInit() {
    this.langItemService.get('1')
      .subscribe(langItem => {
        this.langItem = langItem

        this.characters = getCharacters(langItem).map(({chinese, pinyin}) => ({
          chinese,
          pinyin: this.pinyinDisplay(pinyin)
        }))

        this.examples = this.langItem.examples
          .map(example => {
            const words = getWords(<SimpleTranslation>example)

            return {
              words: words.map(word => 
                word.map(({ chinese, pinyin }) => ({
                  chinese,
                  pinyin: this.pinyinDisplay(pinyin)
                }))),
              english: example.english as string
            }
          })
      })
  }
}
