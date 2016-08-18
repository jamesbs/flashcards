import 'zone.js/dist/zone';
import 'reflect-metadata';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { QuestionProvider } from './question';
import { LangItemProvider } from './lang-item';
import { AppMain } from './app-main.component';

@NgModule({
  declarations: [],
  imports: [BrowserModule],
  providers: [HTTP_PROVIDERS],
  bootstrap: [AppMain],
})
class App { }

platformBrowserDynamic().bootstrapModule(App);
