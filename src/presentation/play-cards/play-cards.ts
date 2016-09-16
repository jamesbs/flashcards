import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CardProvider } from '../../domain/providers'
import { Card, LangItem } from '../../domain/models'

@Component({
  selector: 'app-play-cards',
  templateUrl: './play-cards.html',
  styleUrls: [ './play-cards.styl' ],
})
export class PlayCardsView {
  card: Card

  constructor(
    private route: ActivatedRoute,
    private cardProvider: CardProvider) { }

  ngOnInit() {
    this.route.params
      .mergeMap<Card>(params => this.cardProvider.get(params['cardId']))
      .subscribe(card => {
        this.card = card
      })
  }
}
