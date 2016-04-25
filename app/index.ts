import { Component, provide } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import { Flashcard } from './flashcard/flashcard';
import { HTTP_PROVIDERS } from 'angular2/http';
import { FORM_PROVIDERS, FormBuilder } from 'angular2/common';
import { CharacterService } from './provider/character';

@Component({
    selector: 'app',
    directives: [ Flashcard ],
    template: `
      <h1>Hello World</h1>
      <flashcard></flashcard>
    `  
})
export default class App {
    private myCount: number = 20;
}

bootstrap(App, [
    HTTP_PROVIDERS,
    CharacterService
]);
