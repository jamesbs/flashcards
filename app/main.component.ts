import { Component, OnInit } from 'angular2/core';
import { Observable, Observer } from 'rxjs/Rx';
import 'rxjs/add/operator/delay';
import { Flashcard } from './flashcard/flashcard.component';
import { Character } from './lang-item/character';
import { InputPanel } from './input-panel/input-panel.component';
import { Question, QuestionType, QuestionProvider, validateSolution, Result } from './question/index';

@Component({
    selector: 'app-main',
    directives: [ Flashcard, InputPanel ],
    template: `
        <flashcard [characters]="characters"></flashcard>
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
    private questions: Observable<Question>;
    private questionObserver: Observer<Question>;
    private results: Observable<Result>;
    private resultObserver: Observer<Result>;
    
    constructor(private questionProvider: QuestionProvider) {
        
    }

    ngOnInit() {
        this.questions = new Observable<Question>(
            (observer: Observer<Question>) => {
                this.questionObserver = observer;
            });
            
        this.questions
            .subscribe((question: Question) => {
                this.question = question;
                console.log(question.characters);
                this.characters = question.characters;
            });
            
        this.results = new Observable<Result>(
            (observer: Observer<Result>) => {
                this.resultObserver = observer;
            });
            
        this.next();
    }
    
    next() {
        this.questionProvider.next()
            .subscribe((question: Question) => this.questionObserver.next(question));
    }
    
    compare(solution: string) {
        const result: boolean = validateSolution(solution, this.question);
        
        if(result) {
            this.resultObserver.next('correct');
            
            Observable.of(null)
                .delay(800)
                .subscribe(() => {
                    //this.next();
                })
        } else {
            this.resultObserver.next('incorrect');
        }
    }
}
