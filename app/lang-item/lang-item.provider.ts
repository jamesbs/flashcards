import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { LangItem } from './lang-item';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


const baseUrl = "http://localhost:8999";

@Injectable()
export class LangItemProvider {

    constructor(private http: Http) {
    }
    
    get(id: string): Observable<LangItem> {
        return this.http.get(`${baseUrl}/lang-item/${id}`)
            .map(response => <LangItem>response.json());
    }
    
    next(): Observable<LangItem> { 
        return this.http.get(`${baseUrl}/lang-item/next`)
            .map(response => <LangItem>response.json());
    }
}
