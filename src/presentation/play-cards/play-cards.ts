import { Component, ComponentFactoryResolver, ViewContainerRef,
  trigger, transition, state, style, animate } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CardProvider } from '../../domain/providers'
import { Card, LangItem } from '../../domain/models'
import { isIntroCard } from '../../domain/card'
import { CardViewModel, CardViewState } from '../card'
import { introCardWire } from '../card/intro-card-view-model'
import { LangItemProvider } from '../../domain/providers'

@Component({
  selector: 'app-play-cards',
  templateUrl: './play-cards.html',
  styleUrls: [ './play-cards.styl' ],
  animations: [
    trigger('entry', [
      state('before', style({ 'transform': 'translateX(-100%)' })),
      state('current', style({ 'transform': 'translateX(0)' })),

      transition(
        'before => current',
        animate('1200ms cubic-bezier(0.230, 1.000, 0.320, 1.000)'))
    ]),
  ]
})
export class PlayCardsView {
  card: CardViewModel & CardViewState

  constructor(
    private route: ActivatedRoute,
    private cardProvider: CardProvider,
    private langItemProvider: LangItemProvider) { }

  ngOnInit() {
    this.route.params
      .mergeMap<Card>(params => this.cardProvider.get(params['cardId']))
      .do(card => {
        if (this.card === undefined) {
          this.card = Object.assign(
            card,
            { activity: 'before' } as CardViewState)
        }
      })
      .mergeMap(card => this.langItemProvider.get(card.langItemId)
        .map(langItem => ({ card, langItem })))
      .subscribe(({ card, langItem }) => {
        let cardViewModel: CardViewModel = undefined

        if(isIntroCard(card)) {
          cardViewModel = introCardWire(card, langItem)
        }

        this.card = Object.assign(
          cardViewModel,
          { activity: 'current' } as CardViewState)
      })
  }
}
