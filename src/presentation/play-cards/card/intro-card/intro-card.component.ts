import { Component, Input, Output, EventEmitter, ViewChildren, QueryList, ViewChild,
  ChangeDetectorRef } from '@angular/core'
import { Observable } from 'rxjs'
import { LangItem, Character } from '../../../../domain/entities'
import { getCharacters } from '../../../../domain/lang-item'
import { CharacterComponent } from './character'
import { EnglishInputComponent } from './english-input'
import { CardSounds } from '../../../../shared/services/sound'
import { ActionSounds } from '../../../../shared/services/sound/action-sounds'

@Component({
  selector: 'app-intro-card',
  templateUrl: './intro-card.component.html',
  styleUrls: ['./intro-card.component.styl'],
  providers: [ CardSounds ],
})
export class IntroCardComponent {
  @Input()
  active: boolean

  private _langItem: LangItem

  @Input()
  get langItem() {
    return this._langItem
  }

  set langItem(langItem) {
    this._langItem = langItem
    this.characters = getCharacters(langItem)
  }


  @Input()
  complete = () => { }

  @ViewChildren(CharacterComponent)
  set characterViewsQuery(views: QueryList<CharacterComponent>) {
    this.characterViews = views.toArray()
  }

  @ViewChild(EnglishInputComponent) englishInput: EnglishInputComponent

  pinyinCompleted = false
  englishCompleted = false

  characterViews: CharacterComponent[] = []

  // find a way to implement this as a memoized getter
  characters: Character[]

  characterComplete = (successIndex: number) =>
    () => {
      this.focusNext(successIndex)
      this.actionSounds.success.play()
    }

  focusNext = (successIndex?: number) => {
    const nextAvailable = this.findNextAvailable(successIndex)

    if(nextAvailable === undefined) {
      this.pinyinCompleted = true

      this.cd.detectChanges()

      if(!this.englishCompleted)
        this.englishInput.setFocus()
      else
        this.complete()
    } else {
      this.characterViews[nextAvailable].setFocus()
    }
  }

  findNextAvailable = (successIndex: number) => {
    const viewIndexes = this.characterViews.map((view, index) => ({ view, index }))

    const views = successIndex === undefined
      ? viewIndexes
      : [
          ...viewIndexes.slice(successIndex + 1, this.characterViews.length),
          ...viewIndexes.slice(0, successIndex),
        ]

    const found = views.find(({ view, index }) => !view.completed)

    return found ? found.index : undefined
  }

  englishSuccess = () => {
    this.actionSounds.success.play()
  }

  englishComplete = () => {
    this.englishCompleted = true
    this.cd.detectChanges()

    if(this.pinyinCompleted)
      this.complete()
    else
      this.focusNext()
  }

  failure = () => {
    this.actionSounds.failure.play('main')
  }

  constructor(
    private actionSounds: CardSounds,
    private cd: ChangeDetectorRef) { }

  ngAfterViewInit() {
    Observable.of(this.active)
      .delay(500)
      .subscribe(active => {
        if(active)
          this.focusNext()
      })
  }
}
