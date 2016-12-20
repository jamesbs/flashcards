import { Component, Input, Output, EventEmitter, ViewChild,
  Renderer, ElementRef, HostBinding, HostListener, ChangeDetectorRef } from '@angular/core'
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms'
import { isString } from 'lodash'
import { longest } from '../../../util/collection'
import { Test, fromValue } from './test'
import { Matcher } from './matcher'
import { CompleteCondition } from './complete-condition'

@Component({
  selector: 'app-hinted-input',
  templateUrl: './hinted-input.component.html',
  styleUrls: ['./hinted-input.component.styl']
})
export class HintedInputComponent {
  @Output() focus = new EventEmitter<FocusEvent>()
  @Output() blur = new EventEmitter<FocusEvent>()
  @Output() valueChange = new EventEmitter<string>()
  @Output() success = new EventEmitter<void>()
  @Output() failure = new EventEmitter<void>()
  @Output() complete = new EventEmitter<void>()

  _value: string | string[]
  spacerValue: string

  tests: Test[]

  @Input()
  get value() {
    return this._value
  }
  set value(value) {
    this._value = value

    if(isString(value))
      this.tests = [ fromValue(value) ]
    else
      this.tests = value.map(fromValue)

    const spacer = longest(this.tests.map(test => test.value))

    this.spacerValue = spacer ? spacer.match : ''
  }

  @Input() isValid: Matcher

  @Input()
  set hintDirection(direction: 'slide-up' | 'slide-down') {
    if (direction === 'slide-up') {
      this.slideUp = true
      this.slideDown = false
    } else {
      this.slideDown = true
      this.slideUp = false
    }
  }

  @HostBinding('class.slide-up') slideUp = false

  @HostBinding('class.slide-down') slideDown = false

  @ViewChild('input') input: ElementRef

  @HostBinding('class.completed')
  completed = false

  @HostBinding('class.focused')
  focused = false

  @HostBinding('class.empty')
  get empty() {
    return this.input ? this.input.nativeElement.value === '' : false
  }

  @HostBinding('class.active')
  get active() {
    return !this.completed && (this.focused || !this.empty)
  }

  @HostListener('click')
  setFocus() {
    if (!this.completed)
      this.renderer.invokeElementMethod(this.input.nativeElement, 'focus')
  }

  onFocus(event: FocusEvent) {
    this.focused = true
    this.focus.emit(event)
  }

  onBlur(event: FocusEvent) {
    this.focused = false
    this.blur.emit(event)
  }

  // go away ControlContainer error
  form = new FormGroup({})

  @Input()
  isComplete: CompleteCondition

  submit(event: Event) {
    const testValue = this.input.nativeElement.value
    let hasSuccess = false

    this.tests.forEach(test => {
      if(this.isValid(testValue, test.value)) {
        test.completed = true
        this.success.emit(undefined)
        hasSuccess = true
        this.input.nativeElement.value = ''
      }
    })

    if(this.isComplete(this.tests)) {
      this.focused = false
      this.completed = true
      this.complete.emit(undefined)
    }
      // HACK: why do I need this? causing issues with change detection passes in conjunction with ngIf
    this.cd.detectChanges()

    if(!hasSuccess)
      this.failure.emit(undefined)
  }

  constructor(private renderer: Renderer, private cd: ChangeDetectorRef) { }
}
