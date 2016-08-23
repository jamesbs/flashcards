import { Component } from '@angular/core';
import { LangItemService } from '../lang-item/lang-item.service';
import { LangItem, getCharacters, getWords } from '../lang-item/lang-item';
import { SimpleTranslation } from '../lang-item/simple-translation';
import { Translation } from '../lang-item/translation';
import { Character } from '../lang-item/character';
import { Word } from '../lang-item/word';
import { toStandard } from '../lang-item/pinyin';

interface ExampleView {
  words: {
    chinese: string,
    pinyin: string
  }[][];
  english: string;
}

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.html',
  styleUrls: ['./new-card.styl'],
  providers: [LangItemService],
})
export class NewCard {
  characters: {
    chinese: string,
    pinyin: string,
  }[];
  langItem: LangItem = new LangItem();
  examples: ExampleView[] = [];
  
  pinyinDisplay = toStandard;

  constructor(private langItemService: LangItemService) {

  }

  ngOnInit() {
    this.langItemService.get('1')
      .subscribe(langItem => {
        this.langItem = langItem;
        this.characters = getCharacters(langItem).map(({chinese, pinyin}) => ({
          chinese,
          pinyin: this.pinyinDisplay(pinyin)
        });
        this.examples = this.langItem.examples
          .map(example => {
            const words = getWords(<SimpleTranslation>example);

            return {
              words: words.map(word => 
                word.map(({ chinese, pinyin }) => ({
                  chinese,
                  pinyin: this.pinyinDisplay(pinyin)
                }))),
              english: example.english as string
            }
          });
      })
  }
}
