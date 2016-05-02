import { Component,  Input } from 'angular2/core';
import { LangItem, getCharacters, Character, toBasic } from '../lang-item/index';

@Component({
    selector: 'flashcard',
    template: `
        <div class="card current">
            <div class="character" *ngFor="#character of characters">
                <div class="chinese">{{character.chinese}}</div>
                <div class="pinyin" [hidden]="!showPinyin">{{toBasic(character.pinyin)}}</div>
            </div>
       </div>
    `,
    styles: [`
        .card {
            display: flex;
            justify-content: center;
        }
        
        .card .chinese {
            font-size: 16vw;
            text-align: center;
        }
        
        .card .pinyin {
            margin-top: -2rem;
            margin-bottom: 2rem;
            font-size: 1.6vw;
            text-align: center;
        }
    `]
})
export class Flashcard {
    @Input() private characters: Character[] = [];
    @Input() private showPinyin: boolean = false;
    
    constructor() {}
    
    ngOnInit() {
    }

    toBasic = toBasic;
}
