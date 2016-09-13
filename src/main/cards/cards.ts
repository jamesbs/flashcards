import { Component, ComponentFactoryResolver, ViewContainerRef,
  trigger, state, style, transition, animate } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CardProvider, LangItemProvider } from '../../domain/providers'
import { Card, LangItem } from '../../domain/models'
import { NewCard } from '../../components'


@Component({
  selector: 'app-cards',
  templateUrl: './cards.html',
  styleUrls: [ './cards.styl' ],
  animations: [
    trigger('enter', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)'}),
        animate('500ms cubic-bezier(0.230, 1.000, 0.320, 1.000)')
      ])
    ])
  ]
})
export class Cards {
  current: Card

  enter = undefined

  constructor(
    private route: ActivatedRoute,
    private cardProvider: CardProvider,
    private langItemProvider: LangItemProvider) { }

  currentItem: LangItem

  ngOnInit() {
    this.route.params
      .mergeMap<Card>(params => this.cardProvider.get(params['cardId']))
      .subscribe(card => {
        this.current = card
      })
    /*
    this.langItemProvider.get('1')
      .subscribe(langItem => {
        this.enter = 'in'
        this.currentItem = langItem
      })
    */
  }
}
