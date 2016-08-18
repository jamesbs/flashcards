import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';
import { QuestionProvider } from './question';
import { LangItemProvider } from './lang-item';
import { AppMain } from './app-main.component';

@NgModule({
  declarations: [],
  imports: [ BrowserModule, ReactiveFormsModule ],
  providers: [ HTTP_PROVIDERS, QuestionProvider, LangItemProvider ],
  bootstrap: [ AppMain ],
})
export class App { }
