import { Component, Input, Output, EventEmitter } from '@angular/core'
import { FormControl } from '@angular/forms'
import { isTone } from '../../../domain/tone'
import { toStandard } from '../../../view/pinyin'

@Component({
  selector: 'pinyin-input',
  templateUrl: './pinyin-input.html',
})
export class PinyinInput {
  basicPinyin = new FormControl('')
  @Output() focus = new EventEmitter<FocusEvent>()
  @Output() blur = new EventEmitter<FocusEvent>()
  @Output() standardized = new EventEmitter<string>()

  standardPinyin = ''

  @Input() pinyin = ''

  get dirty() {
    return this.basicPinyin.dirty
  }

  ngOnInit() {
    this.basicPinyin.valueChanges
      .subscribe(pinyin => {
        const last = pinyin.slice(-1)

        if(isTone(last)) {
          this.standardPinyin = toStandard({ syllable: pinyin.slice(0, -1), tone: last })
          this.standardized.emit(this.standardPinyin)
        } else {
          this.standardPinyin = pinyin
        }
      })
  }

  handleKeydown(event: KeyboardEvent) {
    if(event.code.slice(0,5) === 'Digit' || event.code.slice(0,3) === 'Key') {
      this.basicPinyin.setValue(this.basicPinyin.value + event.key)
      event.preventDefault()
    }
  }

  isDefault = (pinyin: string) => (input: HTMLInputElement) => input.value === pinyin
}
