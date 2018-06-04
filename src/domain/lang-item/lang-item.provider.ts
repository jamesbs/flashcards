import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { LangItem } from './lang-item'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

const baseUrl = 'http://localhost:8999'

@Injectable({ providedIn: 'root' })
export class LangItemProvider {

  constructor(private http: HttpClient) { }

  get(id: string): Observable<LangItem> {
    return this.http.get<LangItem>(`${baseUrl}/lang-item/${id}`)
  }

  next(): Observable<LangItem> {
    return this.http.get<LangItem>(`${baseUrl}/lang-item/next`)
  }
}
