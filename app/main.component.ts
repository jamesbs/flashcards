import { Component } from 'angular2/core';
import { Flashcard } from './flashcard/index';
import { LangItemProvider } from './lang-item/index';

@Component({
    selector: 'app-main',
    directives: [ Flashcard ],
    template: `
        main part of page
        <flashcard></flashcard>
    `
})
export class Main {
    constructor() {
        
    }
}
