import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core'
import { Card, LangItem } from '../../../domain/models'
import { LangItemProvider } from '../../../domain/providers'
import { IntroCardView } from '../../../components'
import { CardActivity } from './card-activity'
import { CardViewModel } from './card-view-model'

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrls: ['./card.styl']
})
export class CardView {
  @Input()
  card: CardViewModel

  @Input()
  active: boolean

  @Output()
  complete = new EventEmitter<void>()

  constructor(private langItemProvider: LangItemProvider) { }
}

