import { Component, Input, Output, EventEmitter, HostBinding, ChangeDetectorRef } from '@angular/core'
import { Card, LangItem } from '../../../domain/entities'
import { LangItemProvider } from '../../../domain/providers'
import { IntroCardComponent } from '../../../components'
import { CardContext } from './card-context'
import { CardActivity } from './card-activity'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.styl']
})
export class CardComponent {
  private _card: CardContext

  @Input()
  get card() {
    return this._card
  }

  set card(val) {
    this._card = val
    this.cd.detectChanges()
  }

  @Input()
  active: boolean

  @Input()
  complete = () => { }

  constructor(
    private langItemProvider: LangItemProvider,
    private cd: ChangeDetectorRef) { }
}

