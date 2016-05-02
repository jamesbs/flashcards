import { Component,  Input } from 'angular2/core';
import { LangItem, getCharacters, Character, toBasic } from '../lang-item/index';

@Component({
    selector: 'flashcard',
    template: `
        <div class="card current {{result}}">
            <div class="character" *ngFor="#character of characters">
                <div class="chinese">{{character.chinese}}</div>
                <div class="pinyin">{{toBasic(character.pinyin)}}</div>
            </div>
       </div>
    `,
    styles: [`
        .card {
            font-size: 16vw;
            text-align: center;
        }
    `]
})
export class Flashcard {
    @Input() private characters: Character[] = [];
    
    constructor() {}
    
    ngOnInit() {
    }

    toBasic = toBasic;
}
