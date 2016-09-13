import { Component,
  trigger, state, style, transition, animate } from '@angular/core'
import { LangItemService } from '../services'
import { LangItem } from '../domain/models'


@Component({
  selector: 'app-slides',
  templateUrl: './slides.html',
  styleUrls: ['./slides.styl'],
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
export class Slides {
  enter = undefined

  constructor(private langItemService: LangItemService) { }

  currentItem: LangItem

  ngOnInit() {
    this.langItemService.get('1')
      .subscribe(langItem => {
        this.enter = 'in'
        this.currentItem = langItem
      })
  }
}
