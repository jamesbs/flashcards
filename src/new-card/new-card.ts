import { Component } from '@angular/core';
import { LangItemProvider } from '../lang-item/lang-item.provider';
import { LangItem, getCharacters, getWords } from '../lang-item/lang-item';
import { SimpleTranslation } from '../lang-item/simple-translation';
import { Translation } from '../lang-item/translation';
import { Character } from '../lang-item/character';
import { Word } from '../lang-item/word';

interface ExampleView {
  words: Word[];
  english: string;
}

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.html',
  styleUrls: ['./new-card.styl'],
  providers: [LangItemProvider],
})
export class NewCard {
  characters: Character[];
  langItem: LangItem = new LangItem();
  examples: ExampleView[] = [];

  constructor(private langItemProvider: LangItemProvider) {

  }

  ngOnInit() {
    this.langItemProvider.get('1')
      .subscribe(langItem => {
        this.langItem = langItem;
        this.characters = getCharacters(langItem);
        this.examples = this.langItem.examples
          .map(example => ({
            words: getWords(<SimpleTranslation>example),
            english: example.english as string
          }));
      })
  }
}
