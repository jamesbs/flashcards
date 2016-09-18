import { Component, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef,
  trigger, transition, state, style, animate } from '@angular/core'
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router'
import { CardProvider } from '../../domain/providers'
import { Card, LangItem } from '../../domain/models'
import { isIntroCard } from '../../domain/card'
import { CardViewModel, CardViewState, CardActivity, setActivity, cardWire } from './card'
import { IntroCardViewModel, introCardViewModelWire } from './card/intro-card/intro-card-view-model'
import { LangItemProvider } from '../../domain/providers'
import { SlideDirection, getDirection } from './slide-direction'

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
  ],
})
export class PlayCardsView {
  activeCard: CardViewModel & CardViewState

  unloadingCard: CardViewModel & CardViewState

  get entry() {
    return this.activeCard
      ? this.activeCard.activity
      : 'before'
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cardProvider: CardProvider,
    private langItemProvider: LangItemProvider,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.route.params
      .mergeMap<Card>(params => this.cardProvider.get(params['cardId']))
      .do(this.prepareCard)
      .mergeMap(card => this.langItemProvider.get(card.langItemId)
        .map(langItem => ({ card, langItem })))
      .subscribe(({ card, langItem }) => {
        this.activeCard = setActivity(cardWire(card, { langItem }), 'current')
      })
  }

  move(direction: SlideDirection) {
    if(direction === 'forward')
      this.router.navigate([ '/play', this.activeCard.next ])
    else
      this.router.navigate([ '/play', this.activeCard.previous ])
  }

  prepareCard = (card: Card) => {
    if (this.activeCard === undefined) {
      this.activeCard = setActivity(card, 'before')
    } else {
      this.unloadingCard = this.activeCard
      this.cd.detectChanges()

      this.unloadAndPrepare(
        card,
        getDirection(
          introCardViewModelWire(this.unloadingCard as IntroCardViewModel),
          card))
    }
  }

  unloadAndPrepare = (card: Card, direction: SlideDirection) => {
    if(direction === 'forward') {
      this.unloadingCard = setActivity(this.unloadingCard, 'after')
      this.activeCard = setActivity(card, 'before')
    } else {
      this.unloadingCard = setActivity(this.unloadingCard, 'before')
      this.activeCard = setActivity(card,  'after')
    }
  }
}
