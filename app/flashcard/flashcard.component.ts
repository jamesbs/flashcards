import { Component,  Input } from 'angular2/core';
import { LangItem } from '../lang-item/index';

@Component({
    selector: 'flashcard',
    template: `
        <div class="card current {{result}}">{{langItem.chinese}}</div>
    `,
    styles: [`
        .card {
            font-size: 16vw;
            text-align: center;
        }
    `]
})
export class Flashcard {
    @Input() private langItem: LangItem;

    constructor() {}
    
    ngOnInit() {
    }
}
