import { Component, Input, Output, EventEmitter, HostBinding, ChangeDetectorRef } from '@angular/core'
import { Card, LangItem } from '../../../domain/entities'
import { LangItemProvider } from '../../../domain/providers'
import { IntroCardComponent } from '../../../components'
import { CardActivity } from './card-activity'
import { CardViewModel } from './card-view-model'

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrls: ['./card.styl']
})
export class CardComponent {

  private _card: CardViewModel

  @Input()
  get card(): CardViewModel
  {
    return this._card
  }

  set card(val) {
    this._card = val
    this.cd.detectChanges()
  }

  @Input()
  active: boolean

  @Output()
  complete = new EventEmitter<void>()

  constructor(private langItemProvider: LangItemProvider, private cd: ChangeDetectorRef) { }
}

