import { Component } from '@angular/core'
import { LangItemService } from '../services'
import { LangItem } from '../domain/models'


@Component({
  selector: 'app-slides',
  templateUrl: './slides.html',
  styleUrls: ['./slides.styl']
})
export class Slides {
  constructor(private langItemService: LangItemService) { }

  currentItem: LangItem

  ngOnInit() {
    this.langItemService.get('1')
      .subscribe(langItem => {
        this.currentItem = langItem
      })
  }
}
