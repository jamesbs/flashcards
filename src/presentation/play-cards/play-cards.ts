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
import { SlideDirection, getDirection, gd } from './slide-direction'

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
  activeCard: Observable<CardViewModel> = this.route.params
      .mergeMap<Card>(params => this.cardProvider.get(params['cardId']))
      .mergeMap<CardViewModel>(card => this.langItemProvider.get(card.langItemId)
          .map(langItem => cardWire(card, { langItem })))

  unloadingCard: Observable<CardViewModel> = this.route.params
    .withLatestFrom(this.activeCard)
    .map(([ params, card ]) => card)

  activeCardActivity: Observable<CardActivity> =
    this.activeCard.withLatestFrom<SlideDirection>(this.moveDirection)
      .map<CardActivity>(([ card, direction ]) =>
        direction === 'forward' ? 'before' : 'after')

  unloadingCardActivity: Observable<CardActivity> =
    this.unloadingCard.withLatestFrom<SlideDirection>(this.moveDirection)
      .map<CardActivity>(([ card, direction ]) =>
        direction === 'forward' ? 'after' : 'before')

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cardProvider: CardProvider,
    private langItemProvider: LangItemProvider,
    private cd: ChangeDetectorRef) { }

  move = new EventEmitter<SlideDirection>()

  moveDirection = Observable.merge(
    this.move,
    this.unloadingCard.withLatestFrom(this.route.params)
      .map(([ unloadingCard, params ]) => gd(unloadingCard, params['cardId'])))

  moveRouter = Observable.combineLatest<CardViewModel & CardViewState, SlideDirection>(this.activeCard, this.move)
    .map<string>(([ card, direction ]: [ CardViewModel & CardViewState, SlideDirection]) =>
      direction === 'forward' ? card.next : card.previous)
    .subscribe(nextId => {
      this.router.navigate([ '/play', nextId ])
    })

  ngOnInit() {
    this.move.emit(undefined)

    this.activeCard.withLatestFrom(this.move)
      .subscribe(args => {
        console.log()
      })

    console.log('fin')

    this.activeCard.subscribe(card => {
      console.log('active card', card)
    })

    this.activeCard.withLatestFrom<SlideDirection>(this.moveDirection)
      .subscribe(([ card, direction ]) => {
        console.log('ac direction', direction)
        //direction === 'forward' ? 'before' : 'after')
      })

    this.unloadingCard.subscribe(card => {
      console.log('unloading card', card)
    })

    this.activeCardActivity.subscribe(activity => {
      console.log('active card activity', activity)
    })
  }

  // prepareCard = (card: Card) => {
  //   if (this.activeCard === undefined) {
  //     this.activeCard = setActivity(card, 'before')
  //   } else {
  //     this.unloadingCard = this.activeCard
  //     this.cd.detectChanges()

  //     this.unloadAndPrepare(
  //       card,
  //       getDirection(
  //         introCardViewModelWire(this.unloadingCard as IntroCardViewModel),
  //         card))
  //   }
  // }

  // unloadAndPrepare = (card: Card, direction: SlideDirection) => {
  //   if(direction === 'forward') {
  //     this.unloadingCard = setActivity(this.unloadingCard, 'after')
  //     this.activeCard = setActivity(card, 'before')
  //   } else {
  //     this.unloadingCard = setActivity(this.unloadingCard, 'before')
  //     this.activeCard = setActivity(card,  'after')
  //   }
  // }
}
