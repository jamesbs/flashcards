import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Rx'
import { LangItem, Character } from '../domain/models'
import { LangItemProvider } from '../domain/providers'
import { getCharacters } from '../domain/lang-item'
import { Question } from './question'
import { QuestionType } from './question-type'
import { random } from '../util/random'


@Injectable()
export class QuestionProvider {
  constructor(private langItemProvider: LangItemProvider) { }

  next(): Observable<Question> {
    const questionTypes = [ 'english', 'pinyin' ]
    return this.langItemProvider.next()
      .map((langItem: LangItem): Question => ({
        type: <QuestionType>questionTypes[random(2)],
        characters: getCharacters(langItem),
        english: langItem.english
      }))
  }
}
