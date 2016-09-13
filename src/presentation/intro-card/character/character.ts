import { Component, Input, Output, HostListener, HostBinding, EventEmitter, ViewChild } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { isEqual } from 'lodash'
import { HintedInput } from '../../common/components'
import { Matcher } from '../../common/components/hinted-input'
import { Pinyin, Character } from '../../domain/models'
import { toStandard } from '../../view/pinyin'
import { generatePinyinMatcher } from './pinyin-matcher'

@Component({
  selector: 'app-character',
  templateUrl: './character.html',
  styleUrls: ['./character.styl'],
})
export class CharacterView {
  @Output() success = new EventEmitter<void>()
  @Output() failure = new EventEmitter<void>()

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

  onSuccess() {
    this.success.emit()
    this.completed = true
  }

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
}
