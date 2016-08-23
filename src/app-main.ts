import { Component, provide } from '@angular/core';
import { Header } from './header/header';
import { Main } from './main.component';
import { NewCard } from './new-card/new-card';

@Component({
  selector: 'app',
  templateUrl: './app-main.html',
  styleUrls: [ './app-main.styl' ],
  directives: [ Header, NewCard ],
})
export class AppMain {
}
