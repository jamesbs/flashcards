import { Component, Input, Output, HostListener, HostBinding, EventEmitter, ViewChild } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { isEqual } from 'lodash'
import { PinyinInput } from '../../platform/components'
import { Pinyin, Character } from '../../domain/models'
import { toStandard } from '../../view/pinyin'

@Component({
  selector: 'app-character',
  templateUrl: './character.html',
  styleUrls: ['./character.styl'],
})
export class CharacterView {
  private _character: Character

  @Input()
  get character() {
    return this._character
  }

  set character(character) {
    this._character = character
    this.pinyin = toStandard(this.character.pinyin)
    this.formClass = [ 'length-' + this.pinyin.length ]
  }

  @HostBinding('class.complete')
  @Input()
  complete = false

  @Output()
  success = new EventEmitter<void>()

  @ViewChild(PinyinInput) input: PinyinInput

  // find a way to implement this as a memoized getter
  pinyin: string

  // find a way to implement this as a memoized getter
  formClass: string[] = []

  empty = true

  focused = false

  setFocus() {
    this.input.setFocus()
  }

  get chinese() {
    return this.character.chinese
  }

  private _hintClass: string[] = []
  get hintClass() {
    let generatedHintClass = []

    if(!this.complete && (!this.empty || this.focused))
      generatedHintClass = [ 'input-active' ]
    else
      generatedHintClass = []

    if(!isEqual(this._hintClass, generatedHintClass))
      this._hintClass = generatedHintClass

    return this._hintClass
  }
}
