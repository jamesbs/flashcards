import { Component } from "angular2/core";

@Component({
    selector: 'app-header',
    template: `
        <a href="/">flashcards</a>
    `,
    styles: [`
        a {
            font-size: 1.2rem;
            color: #333;
            text-transform: uppercase;
        }
    `]
})
export class Header {
    
}
