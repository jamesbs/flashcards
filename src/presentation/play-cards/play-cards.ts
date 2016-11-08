import { Component, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef, EventEmitter,
  trigger, transition, state, style, animate } from '@angular/core'
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router'
import { Observable } from 'rxjs'
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
  activeCard: Observable<CardViewModel>

  activeCardState: Observable<CardActivity> =
    this.activeCard.withLatestFrom<SlideDirection>(this.move)
      .mergeMap<CardActivity>(([ card, direction ]) =>
        direction === 'forward' ? 'before' : 'after')

  uc: Observable<CardViewModel & CardViewState> = this.activeCard
    .mergeMap(card => Observable.of(
      card,

    ))

  unloadingCard: CardViewModel & CardViewState

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cardProvider: CardProvider,
    private langItemProvider: LangItemProvider,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.activeCard = this.route.params
      .mergeMap<Card>(params => this.cardProvider.get(params['cardId']))
      .mergeMap<CardViewModel>(card => this.langItemProvider.get(card.langItemId)
          .map(langItem => cardWire(card, { langItem })))
  }

  move = new EventEmitter<SlideDirection>()

  moveRouter = Observable.combineLatest<CardViewModel & CardViewState, SlideDirection>(this.activeCard, this.move)
    .map<string>(([ card, direction ]: [ CardViewModel & CardViewState, SlideDirection]) =>
      direction === 'forward' ? card.next : card.previous)
    .subscribe(nextId => {
      this.router.navigate([ '/play', nextId ])
    })

  setActive = (card: Card)

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
