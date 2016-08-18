import { Injectable } from '@angular/core';
import { QuestionType } from './question-type';
import { LangItem } from '../lang-item/index';
import { Character } from '../lang-item/character';

@Injectable()
export class Question {
  type: QuestionType;
  characters: Character[];
  english: string | string[];
}
