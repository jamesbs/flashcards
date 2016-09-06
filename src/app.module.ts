import { NgModule } from '@angular/core'
import { APP_BASE_HREF } from '@angular/common'
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'
import { QuestionProvider } from './question'
import { LangItemService } from './lang-item/lang-item.service'
import { AppMain } from './app-main'
import { Icons } from './style/icons'
import { declarations } from './declarations'
import { Routes } from './app.routes'

@NgModule({
  declarations: [
    AppMain,
    declarations,
    Icons,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(Routes),
  ],
  providers: [
    QuestionProvider,
    LangItemService,
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
  bootstrap: [ AppMain ],
})
export class App { }
