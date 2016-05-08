import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/delay';
import { Flashcard } from './flashcard/flashcard.component';
import { Character } from './lang-item/character';
import { InputPanel } from './input-panel/input-panel.component';
import { Question, QuestionType, QuestionProvider, validateSolution, Result } from './question/index';

@Component({
    selector: 'app-main',
    directives: [ Flashcard, InputPanel ],
    template: `
        <flashcard
            [characters]="characters"
            [showPinyin]="true"></flashcard>
        <input-panel 
            [questionType]="question.type"
            [results]="results"
            (solution)="compare($event)"
            (moveNext)="next()">
        </input-panel>
        <result></result>
    `
})
export class Main implements OnInit {
    private characters: Character[] = [];
    private question: Question = new Question();
    private result: Result = 'unanswered';
    
    private questions: Observable<Question>;
    private questionObserver: Observer<Question>;
    private results: Observable<Result>;
    private resultObserver: Observer<Result>;
    
    constructor(private questionProvider: QuestionProvider) {
        
    }

    ngOnInit() {
        const questions = new Subject<Question>();
            
        this.questions = questions;
        this.questionObserver = questions;
            
        this.questions
            .subscribe((question: Question) => {
                this.question = question;
                this.characters = question.characters;
            });
            
        const results = new Subject<Result>();
       
        this.results = results;
        this.resultObserver = results;
        
        /*
        Observable.combineLatest(this.questions, this.results)
            .subscribe((val) => {
            })*/
            
        this.next();
    }
    
    next() {
        this.questionProvider.next()
            .subscribe((question: Question) => this.questionObserver.next(question));
    }
    
    // todo: refactor through observables. currently relying on state context
    compare(solution: string) {
        const correct: boolean = validateSolution(solution, this.question);
        
        if(correct) {
            this.publishResult('correct');
            
            Observable.of(null)
                .delay(800)
                .subscribe(() => {
                    this.next();
                })
        } else {
            this.publishResult('incorrect');
        }
    }
    
    publishResult(result: Result) {
        this.resultObserver.next(result);
    }
}
