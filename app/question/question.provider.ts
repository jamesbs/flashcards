import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Rx';
import { LangItem, LangItemProvider, getCharacters, Character } from '../lang-item/index';
import { Question } from './question';
import { QuestionType } from './question-type';
import { random } from '../util/random';


@Injectable()
export class QuestionProvider {
    constructor(private langItemProvider: LangItemProvider) { }
    
    next(): Observable<Question> {
        const questionTypes = [ 'english', 'pinyin' ];
        return this.langItemProvider.next()
            .map((langItem: LangItem): Question => ({
                type: <QuestionType>questionTypes[random(2)],
                characters: getCharacters(langItem),
                english: langItem.english
            }));
    }
}
