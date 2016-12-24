import { Component, Input, Output, EventEmitter, ViewChild, HostListener, HostBinding } from '@angular/core'
import { isArray } from 'lodash'
import { IntroInputComponent, Matcher, allComplete } from '../intro-input'
import { Test } from '../intro-input'

@Component({
  selector: 'app-english-input',
  templateUrl: './english-input.component.html',
  styleUrls: [ './english-input.component.styl' ],
})
export class EnglishInputComponent {
  @HostBinding('class.completed')
  @Input()
  completed = false

  @HostBinding('class.focused')
  focused = false

  focus = () => { this.focused = true }
  blur = () => { this.focused = false }

  @Input() success = () => { }

  @Input() failure = () => { }

  @Input() complete = () => { }

  tests: Test<string>[] = []

  _english: string | string[] = ''

  @Input()
  get english() {
    return this._english
  }

  set english(english) {
    this._english = english

    if(isArray(english))
      this.tests = english.map(e => ({
        value: e,
        display: e,
        completed: false
      }))
    else
      this.tests = [{
        value: english,
        display: english,
        completed: false
      }]
  }

  @ViewChild(IntroInputComponent) input: IntroInputComponent

  @HostListener('click')
  setFocus = () => {
    if(!this.completed)
      this.input.setFocus()
  }

  allComplete = allComplete
}
