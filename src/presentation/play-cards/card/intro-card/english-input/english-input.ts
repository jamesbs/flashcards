import { Component, Input, Output, EventEmitter, ViewChild, HostListener, HostBinding } from '@angular/core'
import { isString } from 'lodash'
import { HintedInput, Matcher } from '../../../../../common/components/hinted-input'

@Component({
  selector: 'app-english-input',
  templateUrl: './english-input.html',
  styleUrls: [ './english-input.styl' ],
})
export class EnglishInput {
  @Output() success = new EventEmitter<void>()
  @Output() failure = new EventEmitter<void>()

  @HostBinding('class.completed')
  completed = false

  @HostBinding('class.focused')
  focused = false

  @ViewChild(HintedInput) input: HintedInput

  private _english: string | string[]

  @Input()
  get english() {
    return this._english
  }

  set english(english) {
    this._english = english
    this.matcher = (value: string) =>
      isString(english)
        ? english === value
        : english.find(word => value === word) !== undefined
  }

  @HostListener('click')
  setFocus() {
    if(!this.completed)
      this.input.setFocus()
  }

  onSuccess() {
    this.completed = true
    this.success.emit()
  }

  matcher: Matcher
}
