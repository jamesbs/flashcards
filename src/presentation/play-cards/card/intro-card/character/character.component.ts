import { Component, Input, Output, HostListener, HostBinding, EventEmitter, ViewChild,
  ChangeDetectorRef } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { isEqual } from 'lodash'
import { HintedInput, allComplete } from '../../../../../common/components/hinted-input'
import { Matcher } from '../../../../../common/components/hinted-input'
import { Pinyin, Character } from '../../../../../domain/entities'
import { toStandard } from '../../../../../view/pinyin'
import { generatePinyinMatcher } from './pinyin-matcher'

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.styl'],
})
export class CharacterComponent {
  @Output() failure = new EventEmitter<void>()
  @Output() complete = new EventEmitter<void>()

  private _character: Character

  @Input()
  get character() {
    return this._character
  }

  set character(character) {
    this._character = character
    this.pinyin = toStandard(character.pinyin)
    this.pinyinMatcher = generatePinyinMatcher(character.pinyin)
  }

  @HostBinding('class.completed')
  @Input()
  completed = false


  @ViewChild(HintedInput) input: HintedInput

  @HostBinding('class.focused')
  focused = false

  @HostListener('click')
  onClick() {
    if (!this.completed)
      this.setFocus()
  }

  onComplete() {
    this.complete.emit()
    this.completed = true
  }

  allComplete = allComplete

  // find a way to implement this as a memoized getter
  pinyin: string

  empty = true

  setFocus() {
    this.input.setFocus()
  }

  get chinese() {
    return this.character.chinese
  }

  pinyinMatcher: Matcher

  constructor(private cd: ChangeDetectorRef) { }

}
