import { Component, Input } from '@angular/core'
import { CardContext } from './card-context'
import { CardActivity } from './card-activity'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.styl']
})
export class CardComponent {
  @Input()
  card: CardContext

  @Input()
  active: boolean

  @Input()
  complete = () => { }
}

