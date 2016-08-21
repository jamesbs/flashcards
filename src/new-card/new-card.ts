import { Component } from '@angular/core';
import { LangItemProvider } from '../lang-item/lang-item.provider';
import { LangItem, getCharacters } from '../lang-item/lang-item';
import { Translation } from '../lang-item/translation';
import { Character } from '../lang-item/character';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.html',
  styleUrls: ['./new-card.styl'],
  providers: [LangItemProvider],
})
export class NewCard {
  characters: Character[];
  examples: Translation[];

  constructor(private langItemProvider: LangItemProvider) {

  }

  ngOnInit() {
    this.langItemProvider.get('1')
      .subscribe(langItem => {
        this.characters = getCharacters(langItem);
        this.examples = langItem.examples;
      })
  }
}
