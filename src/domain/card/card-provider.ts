import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Rx'
import { Card } from './card'
import { IntroCard } from './intro-card'

@Injectable()
export class CardProvider {
  get(id: string): Observable<Card> {
    return Observable
      .of({
        id: 'da39a3ee5e6b4b0d3255bfef95601890afd80709',
        type: 'intro',
        langItemId: '1',
      } as IntroCard)
      .delay(0)
  }

  next(): Observable<string> {
    return Observable
      .of('da39a3ee5e6b4b0d3255bfef95601890afd80709')
      .delay(0)
  }
}
