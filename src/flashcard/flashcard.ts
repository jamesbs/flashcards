import { Component,  Input } from '@angular/core';
import { LangItem, getCharacters, Character, toBasic } from '../lang-item/index';

@Component({
    selector: 'flashcard',
    templateUrl: './flashcard.html',
    styleUrls: ['./flashcard.styl']
})
export class Flashcard {
  @Input() private characters: Character[] = [];
  @Input() private showPinyin: boolean = false;
  
  constructor() {}
  
  ngOnInit() {
  }

  toBasic = toBasic;
}
