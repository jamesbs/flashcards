import { Component, provide } from '@angular/core';
import { Header } from './header.component';
import { Main } from './main.component';
import { NewCard } from './new-card/new-card';

@Component({
  selector: 'app',
  templateUrl: './app-main.component.html',
  styleUrls: [ './app-main.component.styl' ],
  directives: [ Header, NewCard ],
})
export class AppMain {
}
