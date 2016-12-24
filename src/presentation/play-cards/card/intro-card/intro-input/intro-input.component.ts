import { Component, Input, Output, EventEmitter, ViewChild,
  Renderer, ElementRef, HostBinding, HostListener, ChangeDetectorRef } from '@angular/core'
import { FormGroup, FormControl, ValidatorFn, FormBuilder } from '@angular/forms'
import { isArray } from 'lodash'
import { longest } from '../../../../../util/collection'
import { Test, fromValue } from './test'
import { Matcher } from './matcher'
import { CompleteCondition } from './complete-condition'
import { VerticalDirection, Up, Down } from '../../../../../domain/types/direction'

@Component({
  selector: 'app-intro-input',
  templateUrl: './intro-input.component.html',
  styleUrls: ['./intro-input.component.styl']
})
export class IntroInputComponent {
  @Output() valueChange = new EventEmitter<string>()

  @Input() focus = (event: FocusEvent) => { }
  @Input() blur = (event: FocusEvent) => { }
  @Input() failure = () => { }
  @Input() success = () => { }
  @Input() complete = () => { }

  spacerValue = ''

  _tests: Test<any>[] = []

  @Input()
  get tests() {
    return this._tests
  }

  set tests(tests) {
    this._tests = tests

    const spacer = longest(tests.map(({ display }) => display))

    this.spacerValue = spacer ? spacer.match : ''
  }

  @Input() isValid: Matcher

  @Input()
  hintDirection: VerticalDirection

  @HostBinding('class.slide-up')
  get slideUp() {
    return this.hintDirection === Up
  }

  @HostBinding('class.slide-down')
  get slideDown() {
    return this.hintDirection === Down
  }

  @ViewChild('input') input: ElementRef

  @HostBinding('class.completed')
  @Input()
  completed = false

  @HostBinding('class.focused')
  focused = false

  @HostBinding('class.empty')
  get empty() {
    return this.testInput.value === ''
  }

  @HostBinding('class.active')
  get active() {
    return !this.completed
        && (this.focused || !this.empty)
  }

  @HostListener('click')
  setFocus() {
    if(!this.completed)
      this.renderer.invokeElementMethod(this.input.nativeElement, 'focus')
  }

  onFocus(event: FocusEvent) {
    this.focused = true
    this.focus(event)
  }

  onBlur(event: FocusEvent) {
    this.focused = false
    this.blur(event)
  }

  testInput = new FormControl('')

  form = new FormGroup({
    test: this.testInput,
  })

  @Input()
  isComplete: CompleteCondition

  @Input()
  passes = (inputValue: string, test: Test<any>) => inputValue === test.value

  sub = (attempt: string) => {
    const passedTests = this.tests
      .filter(({ completed }) => !completed)
      .filter(test => this.passes(attempt, test))

    if(passedTests.length === 0) {
      this.failure()
    } else {
      // find a way to implement without mutation
      passedTests.forEach(test => {
        test.completed = true
      })

      this.resetValue()

      this.success()
      this.checkForCompletion()
    }
  }

  resetValue = () => {
    this.testInput.patchValue('')
  }

  checkForCompletion = () => {
    if(this.isComplete(this.tests)) {
      this.focused = false
      this.complete()
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer,
    private cd: ChangeDetectorRef) { }
}
