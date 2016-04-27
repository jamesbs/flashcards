import { Component, OnInit } from 'angular2/core';
import { Observable, Observer } from 'rxjs/Rx';
import { Flashcard } from './flashcard/index';
import { LangItem } from './lang-item/index';
import { InputPanel } from './input-panel/index';
import { Solution, Question, QuestionType, QuestionProvider, validateSolution } from './question/index';

@Component({
    selector: 'app-main',
    directives: [ Flashcard, InputPanel ],
    template: `
        <flashcard [langItem]="langItem"></flashcard>
        <input-panel 
            [questionType]="question.type"
            (solution)="compare($event)">
        </input-panel>
    `
})
export class Main implements OnInit {
    private langItem: LangItem = new LangItem();
    private question: Question = new Question();
    private questionObservable: Observable<Question>;
    private questionObserver: Observer<Question>;
    
    constructor(private questionProvider: QuestionProvider) {
        
    }

    ngOnInit() {
        this.questionObservable = new Observable<Question>(
            (observer: Observer<Question>) => {
                this.questionObserver = observer;
            });
            
        this.questionObservable
            .subscribe((question: Question) => {
                this.question = question;
                this.langItem = question.langItem;
            });
            
        this.next();
    }
    
    next() {
        this.questionProvider.next()
            .subscribe((question: Question) => this.questionObserver.next(question));
    }
    
    compare(solution: Solution) {
        const result = validateSolution(solution, this.question);
    }
}
