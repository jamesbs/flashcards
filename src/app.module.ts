import { NgModule, Component } from '@angular/core'
import { APP_BASE_HREF } from '@angular/common'
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'
import { CommonModule as AppCommonModule } from './common/common.module'
import { QuestionProvider } from './question'
import { LangItemProvider, CardProvider } from './domain/providers'
import { AppMain } from './app-main'
import { Icons } from './style/icons'
import { declarations } from './declarations'
import { Routes } from './app.routes'
import { environment } from '../environment'
import { config } from '../config'
import { getConfigProviders } from './config'

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
    AppCommonModule,
    HttpModule,
    RouterModule.forRoot(Routes),
  ],
  providers: [
    QuestionProvider,
    LangItemProvider,
    CardProvider,
    { provide: APP_BASE_HREF, useValue: '/' },
    getConfigProviders(config[environment])
  ],
  bootstrap: [ AppMain ],
})
export class App { }
