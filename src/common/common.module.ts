import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { declarations } from './declarations'

@NgModule({
  declarations,
  imports: [
    ReactiveFormsModule
  ],
  exports: declarations,
  providers: [],
  bootstrap: []
})
export class CommonModule { }
