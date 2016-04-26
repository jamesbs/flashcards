import { Injectable } from 'angular2/core';
import { QuestionType } from './question-type';

@Injectable()
export class Question {
    type: QuestionType;
}
