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
    trigger('load', [

    ]),
  ],
})
export class PlayCardsView {
  card = this.route.params
    .mergeMap(({ cardId }) => this.cardProvider.get(cardId))
    .mergeMap(card =>
      this.langItemProvider.get(card.langItemId)
        .map(langItem => cardWire(card, { langItem })))

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cardProvider: CardProvider,
    private langItemProvider: LangItemProvider,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }
}
