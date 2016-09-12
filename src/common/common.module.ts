import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { declarations } from './declarations'
import { providers } from './providers'

@NgModule({
  declarations,
  imports: [
    ReactiveFormsModule,
    BrowserModule,
  ],
  exports: declarations,
  providers,
  bootstrap: []
})
export class CommonModule { }
