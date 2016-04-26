import { Injectable } from 'angular2/core';
import { QuestionType } from './question-type';


@Injectable()
export class Solution {
    type: QuestionType;
    value: string;
}
