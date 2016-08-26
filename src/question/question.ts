import { Injectable } from '@angular/core'
import { QuestionType } from './question-type'
import { LangItem, Character } from '../domain/models'

@Injectable()
export class Question {
  type: QuestionType
  characters: Character[]
  english: string | string[]
}
