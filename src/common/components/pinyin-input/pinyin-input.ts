import { Component, Input, Output, EventEmitter, HostListener,
  ViewChild, ElementRef, Renderer } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Pinyin } from '../../../domain/models'
import { isTone } from '../../../domain/tone'
import { toStandard } from '../../../view/pinyin'
import { isValid } from './is-valid'

@Component({
  selector: 'pinyin-input',
  templateUrl: './pinyin-input.html',
})
export class PinyinInput {
  @Output() focus = new EventEmitter<FocusEvent>()
  @Output() blur = new EventEmitter<FocusEvent>()
  @Output() valueChange = new EventEmitter<string>()
  @Output() success = new EventEmitter<void>()
  @Output() failure = new EventEmitter<void>()

  @ViewChild('input') input: ElementRef

  private _pinyin: Pinyin

  @Input()
  get pinyin() {
    return this._pinyin
  }

  set pinyin(pinyin) {
    this._pinyin = pinyin

    this.form = new FormGroup({
      input: new FormControl('', isValid(pinyin))
    })

    this.isDefault = (input: HTMLInputElement) => input.value === toStandard(pinyin)
  }

  setFocus() {
    this.renderer.invokeElementMethod(this.input.nativeElement, 'focus')
  }


  private _form: FormGroup

  get form() {
    return this._form
  }

  set form(form) {
    this._form = form

    this._form.valueChanges.subscribe(value => {
      this.valueChange.emit(value.input)
    })
  }

  isDefault: (input: HTMLInputElement) => boolean = () => false

  submit(event: Event) {
    if (this.form.valid) {
      this.success.emit(undefined)
    } else {
      this.failure.emit(undefined)
    }
  }

  constructor(private renderer: Renderer) { }
}
