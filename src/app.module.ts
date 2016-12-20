import { NgModule } from '@angular/core'
import { APP_BASE_HREF } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'

import { SharedModule } from './shared/shared.module'
import { AppRootComponent } from './presentation/app-root'
import { declarations } from './app.declarations'
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
    HttpModule,
    RouterModule.forRoot(Routes),
    SharedModule,
  ],
  providers: [
    ...providers,
    { provide: APP_BASE_HREF, useValue: '/' },
    getConfigProviders(config[environment])
  ],
  bootstrap: [ AppRootComponent ],
})
export class AppModule { }
