import { Component, provide } from '@angular/core';
import { Header } from './header.component';
import { Main } from './main.component';

@Component({
  selector: 'app',
  templateUrl: './app-main.component.html',
  styleUrls: [ './app-main.component.styl' ],
  directives: [ Header, Main ],
})
export class AppMain {
}
