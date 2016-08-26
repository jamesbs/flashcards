import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { LangItem } from '../domain/lang-item'
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map'


const baseUrl = 'http://localhost:8999'

@Injectable()
export class LangItemService {

  constructor(private http: Http) { }

  get(id: string): Observable<LangItem> {
    return this.http.get(`${baseUrl}/lang-item/${id}`)
      .map(response => <LangItem>response.json())
  }

  next(): Observable<LangItem> {
    return this.http.get(`${baseUrl}/lang-item/next`)
        .map(response => <LangItem>response.json())
  }
}
