import { Component, OnInit } from 'angular2/core';
import { Observable, Observer } from 'rxjs/Rx';
import { Flashcard } from './flashcard/index';
import { LangItem, LangItemProvider } from './lang-item/index';
import { InputPanel } from './input-panel/index';
import { Solution, QuestionType } from './solution/index';

@Component({
    selector: 'app-main',
    directives: [ Flashcard, InputPanel ],
    template: `
        <flashcard [langItem]="langItem"></flashcard>
        <input-panel (solution)="compare($event)">
        </input-panel>
    `
})
export class Main implements OnInit {
    private langItem: LangItem = new LangItem();
    private next: () => void;
    
    constructor(private langItemProvider: LangItemProvider) {
        
    }

    ngOnInit() {
        const obs = new Observable<LangItem>((observer: Observer<LangItem>) => 
                this.next = () => this.langItemProvider
                    .next()
                    .subscribe((langItem: LangItem) => observer.next(langItem)))
            .subscribe((item: LangItem) => this.langItem = item);
            
        this.next();
    }
    
    compare(solution: Solution) {
    }
}
