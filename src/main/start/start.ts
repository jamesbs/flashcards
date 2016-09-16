import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Card } from '../../domain/models'
import { CardProvider } from '../../domain/providers'

@Component({
  selector: 'app-start',
  templateUrl: './start.html'
})
export class Start {
  constructor(private cardProvider: CardProvider, private router: Router) { }

  ngOnInit() {
    this.cardProvider.next()
      .subscribe(cardId => {
        this.router.navigate([ '/play', cardId ])
      })
  }
}
