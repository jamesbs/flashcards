import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CardProvider } from '../../domain/providers'
import { Card, LangItem } from '../../domain/models'

@Component({
  selector: 'app-cards',
  templateUrl: './cards.html',
  styleUrls: [ './cards.styl' ],
})
export class Cards {
  current: Card
  last: Card

  constructor(
    private route: ActivatedRoute,
    private cardProvider: CardProvider) { }

  ngOnInit() {
    this.route.params
      .mergeMap<Card>(params => this.cardProvider.get(params['cardId']))
      .subscribe(card => {
        this.current = card
      })
  }
}
