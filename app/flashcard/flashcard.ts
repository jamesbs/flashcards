import { Component, Inject } from 'angular2/core';
import { CharacterService } from '../provider/character';

@Component({
    selector: 'flashcard',
    template: `
        <p>My name is {{character.name}}</p>
    `,
    styles: [`
        p {
            border: 1px solid grey;
            background: #eee;
            display: inline-block;
            padding: 20px;
        }
    `]
})
export class Flashcard {
    character: any;
    
    constructor(private characterService: CharacterService) {
        this.character = {
            name: "Flash"
        };
    }
    
    onInit() {
        this.characterService.getCharacter(1)
            .subscribe(character => {
                this.character = character;
            });
    }
    
    getName(): string {
        return this.character.name;
    }
}
