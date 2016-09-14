import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CardProvider } from '../../domain/providers'
import { Card, LangItem } from '../../domain/models'
import { CardViewModel } from '../../card'

@Component({
  selector: 'app-cards',
  templateUrl: './cards.html',
  styleUrls: [ './cards.styl' ],
})
export class Cards {
  cards: CardViewModel[]

  constructor(
    private route: ActivatedRoute,
    private cardProvider: CardProvider) { }

  ngOnInit() {
    this.route.params
      .mergeMap<CardViewModel[]>(params => this.cardProvider.get(params['cardId'])
        .map(card =>  ([ Object.assign(card, { activity: 'loading' }) as CardViewModel ])))
      .subscribe(cards => {
        this.cards = cards
      })
  }
}
