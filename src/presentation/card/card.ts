import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core'
import { Card, LangItem } from '../../domain/models'
import { LangItemProvider } from '../../domain/providers'
import { IntroCardView } from '../../components'
import { CardActivity } from './card-activity'

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrls: ['./card.styl'],
})
export class CardView {
  private _card: Card

  @Input()
  get card() {
    return this._card
  }

  set card(card: Card) {
    if(card) {
      this._card = card

      if (card.type === 'intro') {
        this.langItemProvider.get(card.langItemId)
          .subscribe(langItem => {
            this.langItem = langItem
            this.enter = 'active'
            this.ready.emit()
          })
      }
    }
  }

  @HostBinding('class.loading')
  get loading() {
    return this.enter === 'loading'
  }

  @HostBinding('class.active')
  get active() {
    return this.enter === 'active'
  }

  @HostBinding('class.unloading')
  get unloading() {
    return this.enter === 'unloading'
  }

  enter: CardActivity = 'loading'

  @Output()
  ready = new EventEmitter<void>()

  langItem: LangItem

  constructor(private langItemProvider: LangItemProvider) { }
}

