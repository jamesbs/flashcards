import { Component, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef, EventEmitter,
  trigger, transition, state, style, animate } from '@angular/core'
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router'
import { Observable, Subject, BehaviorSubject } from 'rxjs'

import { CardProvider } from '../../domain/providers'
import { cardWire } from './card'
import { IntroCardViewModel } from './card/intro-card/intro-card-view-model'
import { LangItemProvider } from '../../domain/providers'
import { SlideDirection, getDirection, gd } from './slide-direction'
import { createMover } from './mover'

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
    trigger('load', [

    ]),
  ],
})
export class PlayCardsView {
  card$ = this.route.params
    .mergeMap(({ cardId }) => this.cardProvider.get(cardId))
    .mergeMap(card =>
      this.langItemProvider.get(card.langItemId)
        .map(langItem => cardWire(card, { langItem })))
    .share()

  previous = createMover(this.card$, ({ previous }) => previous)
  next = createMover(this.card$, ({ next }) => next)

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cardProvider: CardProvider,
    private langItemProvider: LangItemProvider,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    Observable.merge(this.previous.moveId$, this.next.moveId$)
      .subscribe(moveId => {
        this.router.navigate([ 'play', moveId])
      })
  }
}
