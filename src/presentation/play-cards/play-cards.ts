import { Component, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef, EventEmitter,
  trigger, transition, state, style, animate } from '@angular/core'
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router'
import { Observable, BehaviorSubject } from 'rxjs'
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
  latestCard = this.route.params
    .mergeMap<Card>(params => {
      console.log('params', params)
      return this.cardProvider.get(params['cardId'])
    })
    .mergeMap<CardViewModel>(card => {
      console.log('active card', card)
      return this.langItemProvider.get(card.langItemId).map(langItem => cardWire(card, { langItem }))
    })

  activeCard = this.latestCard.share()

  unloadingCard: Observable<CardViewModel> = this.route.params
    .skip(1)
    .withLatestFrom(this.activeCard)
    .map(([ params, card ]) => {
      console.log('uc', params, card)
      return card
    })

  previous = this.activeCard.map(card => card.previous ? true : false)

  next = this.activeCard.map(card => card.next ? true : false)

  move = (direction: SlideDirection) => {
    this.movement.next(direction)
  }

  movement = new BehaviorSubject<SlideDirection>(undefined)

  moveDirection = Observable.merge(
    this.movement,
    this.unloadingCard.withLatestFrom(this.route.params)
      .map(([ unloadingCard, params ]) => {
        console.log('md.uc', unloadingCard)
        const dir = gd(unloadingCard, params['cardId'])
        console.log('md.gd', dir)
        return dir
      }))

  moveRouter =
    this.movement.withLatestFrom(this.activeCard)
    .map<string>(([ direction, card ]) =>
      direction === 'forward' ? card.next : card.previous)
    .subscribe(nextId => {
      console.log('moving router to', nextId)
      this.router.navigate([ '/play', nextId ])
    })

  activeCardEntryAnimation: CardActivity

  activeCardActivity =
    this.activeCard.withLatestFrom<SlideDirection>(this.moveDirection)
      .mergeMap<CardActivity>(([ card, direction ]) =>
        Observable.of(direction === 'backward' ? 'after' : 'before')
          .concat(Observable.of('current').delay(0)))
    .subscribe(activity => {
      this.activeCardEntryAnimation = activity
    })

  unloadingCardEntryAnimation: CardActivity

  unloadingCardActivity =
    this.unloadingCard.withLatestFrom<SlideDirection>(this.moveDirection)
      .mergeMap<CardActivity>(([ card, direction ]) => {
        return Observable.of('current')
          .concat(Observable.of(direction === 'forward' ? 'after' : 'before')
            .delay(0))
      })
      .subscribe(activity => {
        this.unloadingCardEntryAnimation = activity
      })



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cardProvider: CardProvider,
    private langItemProvider: LangItemProvider,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.activeCard.subscribe(c => {
      console.log('ac1', c)
    })

    this.activeCard.subscribe(c => {
      console.log('ac2', c)
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
