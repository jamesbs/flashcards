import { Component, Input, Output, EventEmitter, ViewChildren, QueryList, ViewChild } from '@angular/core'
import { LangItem, Character } from '../domain/models'
import { getCharacters } from '../domain/lang-item'
import { CharacterView } from './character/character'
import { EnglishInput } from './english-input/english-input'

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.html',
  styleUrls: ['./new-card.styl'],
})
export class NewCard {
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

  successSound = new Howl({
      src: [ require('../common/sound/success.ogg') ],
      volume: 0.3,
      rate: 1.5
    })

  characterViews: CharacterView[] = []

  // find a way to implement this as a memoized getter
  characters: Character[]

  characterSuccess(successIndex: number) {
    this.successSound.play()
    this.focusNext(successIndex)
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
    if (this.pinyinCompleted) {
      this.complete.emit()
    } else {
      this.focusNext()
    }

    this.successSound.play()
  }
}
