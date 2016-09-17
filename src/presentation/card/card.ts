import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core'
import { Card, LangItem } from '../../domain/models'
import { LangItemProvider } from '../../domain/providers'
import { IntroCardView } from '../../components'
import { CardActivity } from './card-activity'
import { CardViewModel } from './card-view-model'
import { CardViewState } from './card-view-state'

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrls: ['./card.styl']
})
export class CardView {
  @Input()
  card: CardViewModel & CardViewState

  @HostBinding('class.waiting')
  get waiting() {
    return this.card
      ? this.card.activity === 'waiting'
      : true
  }

  @HostBinding('class.before')
  get before() {
    return this.card
      ? this.card.activity === 'before'
      : true
  }

  @HostBinding('class.current')
  get current() {
    return this.card
      ? this.card.activity === 'current'
      : true
  }

  @HostBinding('class.after')
  get after() {
    return this.card
      ? this.card.activity === 'after'
      : true
  }

  constructor(private langItemProvider: LangItemProvider) { }
}

