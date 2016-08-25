import { NgModule } from '@angular/core'
import { CommonModule, AsyncPipe } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { HTTP_PROVIDERS } from '@angular/http'
import { QuestionProvider } from './question'
import { LangItemService } from './lang-item/lang-item.service'
import { AppMain } from './app-main'
import { Icons } from './style/icons'
import { components } from './declarations'

@NgModule({
  declarations: [ AppMain, components, Icons ],
  imports: [ BrowserModule, CommonModule, ReactiveFormsModule ],
  providers: [ HTTP_PROVIDERS, QuestionProvider, LangItemService ],
  bootstrap: [ AppMain ],
})
export class App { }
