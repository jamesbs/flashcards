import { NgModule, Component } from '@angular/core'
import { APP_BASE_HREF } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'
import { CommonModule as AppCommonModule } from './common/common.module'
import { LangItemProvider, CardProvider } from './domain/providers'
import { AppRootComponent } from './presentation/app-root'
import { declarations } from './declarations'
import { Routes } from './app.routes'
import { providers } from './domain/providers'
import { environment } from '../environment'
import { config } from '../config'
import { getConfigProviders } from './config'

@NgModule({
  declarations,
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppCommonModule,
    HttpModule,
    RouterModule.forRoot(Routes),
  ],
  providers: [
    ...providers,
    { provide: APP_BASE_HREF, useValue: '/' },
    getConfigProviders(config[environment])
  ],
  bootstrap: [ AppRootComponent ],
})
export class AppModule { }
