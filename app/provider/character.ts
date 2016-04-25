import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import * as path from 'path';

@Injectable()
export class CharacterService {
    static base = "http://swapi.co/api"

    constructor(private http: Http) {
    }
    
    getCharacter(id: number) {
        return this.http.get(path.resolve(CharacterService.base, "people", id))
            .map(response => response.json());
    }
}
