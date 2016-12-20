import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { declarations } from './shared.declarations'
import { providers } from './shared.providers'

@NgModule({
  declarations,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: declarations,
  providers,
  bootstrap: []
})
export class SharedModule { }
