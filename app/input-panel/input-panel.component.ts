import { Component, OnInit, Input, Output, EventEmitter } from 'angular2/core';
import { Control, ControlGroup, FormBuilder, Validators } from 'angular2/common';
import { QuestionType, Result } from '../question/index';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/delay';

@Component({
    selector: 'input-panel',
    template: `
        <form [ngFormModel]="form" (submit)="submit($event)">
            <div class="input-area">
                <div class="input-wrapper" [ngClass]="[ questionType, result ].join(' ')">
                    <input autocomplete="off" type="text" name="solution" ngControl="solution" />
                </div>
                <div class="answer correct" [hidden]="result !== 'correct'">
                    <i class="fa fa-check"></i>
                </div>
                <div class="answer incorrect" [hidden]="result !== 'incorrect'">
                    <i class="fa fa-times"></i>
                </div>
                <a class="move-next" (click)="next()"><i class="fa fa-arrow-right"></i></a>
            </div>
        </form>
    `,
    styles: [`
        .input-area {
            width: 80%;
            margin: 0 auto;
            position: relative;
        }

        .input-wrapper {
            padding: 0.4rem;
            border-bottom: 1px solid #888;
        }
        
        .input-wrapper.english {
            background-color: #e3f2fd;
        }
        
        .input-wrapper.pinyin {
            background-color: #ffebee;
        }
        
        .input-wrapper.correct input[name=solution] {
            color: #43a047;
        }
        
        .input-wrapper.incorrect input[name=solution] {
            color: #d50000;
        }
        
        [name=solution] {
            width: 100%;
            font-size: 1.8rem;
            border: 0;
            text-align: center;
            background-color: transparent;
        }
        
        [name=solution]:focus {
            outline-width: 0;
        }
        
        .answer {
            font-size: 8rem;
            position: absolute;
        }
        
        .answer.correct {
            top: -3.5rem;
            right: 0;
            opacity: 0.8;
            color: #43a047;
        }
        
        .answer.incorrect {
            top: -3.5rem;
            right: 0;
            opacity: 0.78;
            color: #d50000;
        }
        
        .move-next {
            top: 0.3rem;
            right: -2.4rem;
            font-size: 2rem;
            position: absolute;
        }
        
        .move-next:hover {
            cursor: pointer;
        }
    `]
})
export class InputPanel implements OnInit {
    private form: ControlGroup;
    
    @Input() private questionType: QuestionType;
    
    private result: Result = 'unanswered';
    @Input() private results: Observable<Result>;
    
    
    @Output() private solution: EventEmitter<string> = new EventEmitter<string>();
    @Output() private moveNext: EventEmitter<any> = new EventEmitter<any>();

    constructor(private builder: FormBuilder) { }
    
    ngOnInit() {
        this.init();
    }
    
    submit(event: Event) {
        const value: string = this.form.find('solution').value || '';
        this.solution.emit(value);
    }
    
    init() {
        this.form = this.builder.group({
            solution: new Control(null, Validators.required)
        });
        
        this.results
            .switchMap((result: Result) => Observable.merge(
                Observable.of(result),
                Observable.of(result).delay(800)))
            .subscribe((result: Result) => {
                if(result === 'unanswered' && this.result === 'correct') {
                    (<Control>this.form.find('solution')).updateValue('');
                }
                this.result = result;
            })
    }
    
    next() {
        this.moveNext.emit("");
    }
}
