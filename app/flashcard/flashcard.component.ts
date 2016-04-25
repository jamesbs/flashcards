import { Component, Inject, OnInit } from 'angular2/core';
import { LangItem, LangItemProvider } from '../lang-item/index';

@Component({
    selector: 'flashcard',
    template: `
        <p>My name is {{langItem.chinese}}</p>
    `,
    styles: [`
        p {
            border: 1px solid grey;
            background: #eee;
            display: inline-block;
            padding: 20px;
        }
    `]
})
export class Flashcard implements OnInit {
    langItem: LangItem = new LangItem();

    constructor(private langItemProvider: LangItemProvider) {
    }
    
    ngOnInit() {
        console.log('execs');
        this.langItemProvider.next()
            .subscribe((langItem: LangItem) => this.langItem = langItem);
    }
}
