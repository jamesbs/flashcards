import { Component,
  trigger, state, style, transition, animate } from '@angular/core'
import { LangItemProvider } from '../../domain/providers'
import { LangItem } from '../../domain/models'


@Component({
  selector: 'app-cards',
  templateUrl: './cards.html',
  styleUrls: ['./cards.styl'],
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
  enter = undefined

  constructor(private langItemProvider: LangItemProvider) { }

  currentItem: LangItem

  ngOnInit() {
    this.langItemProvider.get('1')
      .subscribe(langItem => {
        this.enter = 'in'
        this.currentItem = langItem
      })
  }
}
