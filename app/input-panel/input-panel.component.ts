import { Component, OnInit, Input, Output, EventEmitter } from 'angular2/core';
import { Control, ControlGroup, FormBuilder, Validators } from 'angular2/common';
import { QuestionType, Solution } from '../question/index';

@Component({
    selector: 'input-panel',
    template: `
        <form [ngFormModel]="form" (submit)="submit($event)">
            <div class="input-wrapper" [ngClass]="{ pinyin: questionType === 'pinyin', english: questionType === 'english' }">
                <input type="text" name="solution" ngControl="solution" />
            </div>
        </form>
    `,
    styles: [`
        .input-wrapper {
            width: 80%;
            margin: 0 auto;
            padding: 0.4rem;
            border-bottom: 1px solid #888;
        }
        
        .input-wrapper.english {
            background-color: #e3f2fd;
        }
        
        .input-wrapper.pinyin {
            background-color: #ffebee;
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
    `]
})
export class InputPanel implements OnInit {
    private form: ControlGroup;
    @Input() private questionType: QuestionType;
    
    @Output() private solution: EventEmitter<Solution> = new EventEmitter<Solution>();

    constructor(private builder: FormBuilder) { }
    
    ngOnInit() {
        this.init();
    }
    
    submit(event: Event) {
        const value: string = this.form.find('solution').value || "";
        this.solution.emit({ type: this.questionType, value });
    }
    
    init() {
        this.form = this.builder.group({
            solution: new Control(null, Validators.required)
        });
    }
}
