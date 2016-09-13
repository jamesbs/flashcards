import { Component, Input, ComponentFactoryResolver, ViewContainerRef } from '@angular/core'
import { Card } from '../domain/models'
import { LangItemProvider } from '../domain/providers'
import { NewCard } from '../components'

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrls: ['./card.styl'],
})
export class CardView {
  @Input()
  set card(card: Card) {
    if (card.type === 'intro') {
      this.langItemProvider.get(card.langItemId)
        .subscribe(langItem => {
          const cf = this.componentFactoryResolver.resolveComponentFactory(NewCard)
          const component = this.viewContainer.createComponent(cf)
          component.instance.langItem = langItem
        })
    }
  }

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private langItemProvider: LangItemProvider) { }
}
