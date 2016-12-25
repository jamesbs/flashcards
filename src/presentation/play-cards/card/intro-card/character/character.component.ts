import { Component, Input, Output, HostListener, HostBinding, EventEmitter, ViewChild,
  ChangeDetectorRef } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { isEqual } from 'lodash'

import { IntroInputComponent, allComplete } from '../intro-input'
import { Pinyin, Character } from '../../../../../domain/entities'
import { standardFormat } from '../../../../../domain/pinyin'
import { toBasic } from '../../../../../domain/pinyin'
import { Test } from '../intro-input'

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.styl'],
})
export class CharacterComponent {
  @Input() failure = () => { }

  tests: Test<Pinyin>[] = []

  private _character: Character

  @Input()
  get character() {
    return this._character
  }

  set character(character) {
    this._character = character

    this.tests = [ {
      value: character.pinyin,
      display: standardFormat(character.pinyin),
      completed: false,
    } ]
  }

  @HostBinding('class.completed')
  completed = false

  @Input() complete = () => { }

  onComplete = () => {
    this.completed = true
    this.complete()
  }

  @HostBinding('class.focused')
  focused = false

  focus = () => { this.focused = true }
  blur = () => { this.focused = false }

  // find a better way to handle focus
  @ViewChild(IntroInputComponent) input: IntroInputComponent

  @HostListener('click')
  onClick() {
    if(!this.completed)
      this.setFocus()
  }

  setFocus() {
    this.input.setFocus()
  }

  passes = (inputValue: string, test: Test<Pinyin>) => inputValue === toBasic(test.value)

  allComplete = allComplete
}
