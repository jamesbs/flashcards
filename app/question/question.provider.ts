import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Rx';
import { LangItem, LangItemProvider } from '../lang-item/index';
import { Question } from './question';


@Injectable()
export class QuestionProvider {
    constructor(private langItemProvider: LangItemProvider) { }
    
    next(): Observable<Question> {
        return this.langItemProvider.next()
            .map((langItem: LangItem): Question => ({
                type: 'english',
                langItem: langItem
            }));
    }
}
