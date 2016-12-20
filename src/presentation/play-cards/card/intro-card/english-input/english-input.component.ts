import { Component, Input, Output, EventEmitter, ViewChild, HostListener, HostBinding } from '@angular/core'
import { isString } from 'lodash'
import { HintedInput, Matcher, allComplete } from '../../../../../common/components/hinted-input'

@Component({
  selector: 'app-english-input',
  templateUrl: './english-input.component.html',
  styleUrls: [ './english-input.component.styl' ],
})
export class EnglishInputComponent {
  @Output() success = new EventEmitter<void>()
  @Output() failure = new EventEmitter<void>()
  @Output() complete = new EventEmitter<void>()

  @HostBinding('class.completed')
  completed = false

  @HostBinding('class.focused')
  focused = false

  @ViewChild(HintedInput) input: HintedInput

  @Input()
  english: string | string[]

  @HostListener('click')
  setFocus() {
    if(!this.completed)
      this.input.setFocus()
  }

  onSuccess() {
    this.success.emit()
  }

  onComplete() {
    this.completed = true
    this.complete.emit()
  }

  englishMatcher: Matcher = (input, comparison) => input === comparison

  allComplete = allComplete
}
