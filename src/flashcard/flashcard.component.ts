import { Component,  Input } from '@angular/core';
import { LangItem, getCharacters, Character, toBasic } from '../lang-item/index';

@Component({
    selector: 'flashcard',
    templateUrl: './flashcard.component.html',
    styleUrls: ['./flashcard.component.styl']
})
export class Flashcard {
    @Input() private characters: Character[] = [];
    @Input() private showPinyin: boolean = false;
    
    constructor() {}
    
    ngOnInit() {
    }

    toBasic = toBasic;
}
