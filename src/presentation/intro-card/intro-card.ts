import { Component, Input, Output, EventEmitter, ViewChildren, QueryList, ViewChild,
  ChangeDetectorRef } from '@angular/core'
import { Observable } from 'rxjs'
import { LangItem, Character } from '../../domain/models'
import { getCharacters } from '../../domain/lang-item'
import { CharacterView } from './character/character'
import { EnglishInput } from './english-input/english-input'
import { CardSounds } from '../../common/services/sound'
import { ActionSounds } from '../../common/services/sound/action-sounds'

@Component({
  selector: 'app-intro-card',
  templateUrl: './intro-card.html',
  styleUrls: ['./intro-card.styl'],
  providers: [ CardSounds ],
})
export class IntroCardView {
  @Input()
  active: boolean

  private _langItem: LangItem

  @Input()
  get langItem() {
    return this._langItem
  }

  set langItem(langItem) {
    this._langItem = langItem
    this.characters = getCharacters(this.langItem)
  }

  @Output()
  complete = new EventEmitter<void>()

  @ViewChildren(CharacterView)
  set characterViewsQuery(views: QueryList<CharacterView>) {
    this.characterViews = views.toArray()
  }

  @ViewChild(EnglishInput) englishInput: EnglishInput

  pinyinCompleted = false
  englishCompleted = false

  characterViews: CharacterView[] = []

  // find a way to implement this as a memoized getter
  characters: Character[]

  characterSuccess(successIndex: number) {
    this.focusNext(successIndex)
    this.actionSounds.success.play()
  }

  focusNext(successIndex?: number) {
    const nextAvailable = this.findNextAvailable(successIndex)

    if(nextAvailable === undefined) {
      this.pinyinCompleted = true

      if(!this.englishCompleted) {
        this.englishInput.setFocus()
      } else {
        this.complete.emit()
      }
    } else {
      this.characterViews[nextAvailable].setFocus()
    }
  }

  findNextAvailable(successIndex: number) {
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

  englishSuccess() {
    this.actionSounds.success.play()

    if(this.pinyinCompleted)
      this.complete.emit()
    else
      this.focusNext()
  }

  onFailure() {
    this.actionSounds.failure.play('main')
  }

  constructor(private actionSounds: CardSounds, private cd: ChangeDetectorRef) { }

  ngAfterViewInit() {
    Observable.of(this.active)
      .delay(500)
      .subscribe(active => {
        if (active)
          this.focusNext()
      })
    this.cd.detectChanges() // why?
  }
}
