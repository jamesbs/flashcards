import { Component, ComponentFactoryResolver, ViewContainerRef,
  trigger, transition, state, style, animate, ChangeDetectorRef } from '@angular/core'
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router'
import { CardProvider } from '../../domain/providers'
import { Card, LangItem } from '../../domain/models'
import { isIntroCard } from '../../domain/card'
import { CardViewModel, CardViewState } from '../card'
import { IntroCardViewModel, introCardWire, introCardViewModelWire } from '../card/intro-card-view-model'
import { LangItemProvider } from '../../domain/providers'
import { getDirection } from './slide-direction'

const slide = animate('1200ms cubic-bezier(0.230, 1.000, 0.320, 1.000)')

@Component({
  selector: 'app-play-cards',
  templateUrl: './play-cards.html',
  styleUrls: [ './play-cards.styl' ],
  animations: [
    trigger('entry', [
      state('before', style({ 'transform': 'translateX(-100%)' })),
      state('current', style({ 'transform': 'translateX(0)' })),
      state('after', style({ 'transform': 'translateX(101%)' })),

      transition('before => current', slide),
      transition('current => after', slide),
      transition('after => current', slide),
      transition('current => before', slide),
    ]),
  ]
})
export class PlayCardsView {

  card: CardViewModel & CardViewState

  unloadingCard: CardViewModel & CardViewState

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cardProvider: CardProvider,
    private langItemProvider: LangItemProvider,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.route.params
      .mergeMap<Card>(params => this.cardProvider.get(params['cardId']))
      .do(card => {
        if (this.card === undefined) {
          this.card = Object.assign(
            card,
            { activity: 'before' } as CardViewState)
        } else {
          this.unloadingCard = this.card
          this.cd.detectChanges()

          const direction = getDirection(
              introCardViewModelWire(this.unloadingCard as IntroCardViewModel),
              card)

          if(direction === 'forward') {
            this.unloadingCard.activity = 'after'

            this.card = Object.assign(
              card,
              { activity: 'before' } as CardViewState)
          } else {
            this.unloadingCard.activity = 'before'

            this.card = Object.assign(
              card,
              { activity: 'after' } as CardViewState)
          }
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
