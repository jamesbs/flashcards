import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Card } from '../../domain/entities'
import { CardProvider } from '../../domain/providers'

@Component({
  selector: 'app-home',
  templateUrl: './home.html'
})
export class HomeView {
  constructor(private cardProvider: CardProvider, private router: Router) { }

  ngOnInit() {
    this.cardProvider.next()
      .subscribe(cardId => {
        this.router.navigate([ '/play', cardId ])
      })
  }
}
