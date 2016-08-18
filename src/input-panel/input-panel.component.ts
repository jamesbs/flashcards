import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionType, Result } from '../question/index';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'input-panel',
  templateUrl: './input-panel.component.html',
  styleUrls: ['./input-panel.component.styl']
})
export class InputPanel implements OnInit {
  private form: FormGroup = new FormGroup({
    solution: new FormControl(null, Validators.required)
  });
  
  @Input() private questionType: QuestionType;
  
  private result: Result = 'unanswered';
  @Input() private results: Observable<Result>;
  
  @Output() private solution: EventEmitter<string> = new EventEmitter<string>();
  @Output() private moveNext: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
  
  ngOnInit() {
    this.init();
  }
  
  submit(event: Event) {
    const value: string = this.form.find('solution').value || '';
    this.solution.emit(value);
  }
  
  init() {
    this.results
      .switchMap((result: Result) => Observable.merge(
        Observable.of(result),
        Observable.of(result).delay(800)))
      .subscribe((result: Result) => {
        if(result === 'unanswered' && this.result === 'correct') {
          (<FormControl>this.form['solution']).updateValue('');
        }
        this.result = result;
      })
  }
  
  next() {
    this.moveNext.emit('');
  }
}
