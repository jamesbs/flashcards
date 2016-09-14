import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Rx'
import { Card } from './card'
import { IntroCard } from './intro-card'

@Injectable()
export class CardProvider {
  get(id: string): Observable<Card> {
    const idMap: { [key: string]: IntroCard } = {
      'da39a3ee5e6b4b0d3255bfef95601890afd80709': {
        id: 'da39a3ee5e6b4b0d3255bfef95601890afd80709',
        type: 'intro',
        langItemId: '1',
      },
      '3da541559918a808c2402bba5012f6c60b27661c': {
        id: '3da541559918a808c2402bba5012f6c60b27661c',
        type: 'intro',
        langItemId: '2',
      },
    }

    return Observable
      .of(idMap[id])
      .delay(0)
  }

  next(): Observable<string> {
    return Observable
      .of('da39a3ee5e6b4b0d3255bfef95601890afd80709')
      .delay(0)
  }
}
