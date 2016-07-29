import { Component, provide } from '@angular/core';
import { Header } from './header.component';
import { Main } from './main.component';

@Component({
    selector: 'app',
    directives: [ Header, Main ],
    template: `
        <header>
            <app-header></app-header>
        </header>
        <main>
            <app-main></app-main>
        </main>
        <footer>
        </footer>
    `  
})
export class App {
}
