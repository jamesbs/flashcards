import { Injectable } from 'angular2/core';
import { QuestionType } from './question-type';
import { LangItem } from '../lang-item/index';

@Injectable()
export class Question {
    type: QuestionType;
    langItem: LangItem;
}
