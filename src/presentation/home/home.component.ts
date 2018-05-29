import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CardProvider } from '../../domain/providers'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  constructor(private cardProvider: CardProvider, private router: Router) { }

  ngOnInit() {
    this.cardProvider.next()
      .subscribe(cardId => {
        this.router.navigate(['play', cardId])
      })
  }
}
