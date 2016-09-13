import { Component, Input, Output, EventEmitter, ViewChild,
  Renderer, ElementRef, HostBinding, HostListener, ChangeDetectorRef } from '@angular/core'
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms'

type Matcher = (value: string) => boolean

const validator = (matcher: Matcher) => (control: FormControl) =>
  matcher(control.value)
    ? undefined
    : { invalid: "Value entered doesn't match." }


@Component({
  selector: 'app-hinted-input',
  templateUrl: './hinted-input.html',
  styleUrls: ['./hinted-input.styl']
})
export class HintedInput {
  @Output() focus = new EventEmitter<FocusEvent>()
  @Output() blur = new EventEmitter<FocusEvent>()
  @Output() valueChange = new EventEmitter<string>()
  @Output() success = new EventEmitter<void>()
  @Output() failure = new EventEmitter<void>()

  @Input() value: string
  @Input() matcher: (value: string) => boolean
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

  private _form: FormGroup = new FormGroup({})

  get form() {
    return this._form
  }

  set form(form) {
    this._form = form
  }

  @ViewChild('input') input: ElementRef


  @HostBinding('class.completed')
  completed = false

  @HostBinding('class.focused')
  focused = false

  @HostBinding('class.empty')
  get empty() {
    return this.form.controls['input'].value === ''
  }

  @HostBinding('class.active')
  get active() {
    return !this.completed && (this.focused || !this.empty)
  }

  @HostListener('click')
  setFocus() {
    if (!this.completed) {
      this.renderer.invokeElementMethod(this.input.nativeElement, 'focus')
    }
  }

  onFocus(event: FocusEvent) {
    this.focused = true
    this.focus.emit(event)
  }

  onBlur(event: FocusEvent) {
    this.focused = false
    this.blur.emit(event)
  }

  submit(event: Event) {
    if (this.form.valid) {
      this.success.emit(undefined)
      this.focused = false
      this.completed = true
      // HACK: why do I need this? causing issues with change detection passes in conjunction with ngIf
      this.cd.detectChanges()
    } else {
      this.failure.emit(undefined)
    }
  }

  constructor(private renderer: Renderer, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.form = new FormGroup({
      input: new FormControl('', validator(this.matcher))
    })
  }
}
