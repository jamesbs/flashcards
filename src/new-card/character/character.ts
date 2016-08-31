import { Component, Input, HostListener } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { Character, Pinyin } from '../../domain/models'
import { toStandard } from '../../view/pinyin'

@Component({
  selector: 'app-character',
  templateUrl: './character.html'
})
export class CharacterView {
  private _character: Character

  @Input()
  get character() {
    return this._character
  }

  set character(character: Character) {
    this._character = character
    this.pinyin = toStandard(this.character.pinyin)
  }

  // find a way to implement this as a memoized getter
  pinyin: string

  get chinese() {
    return this.character.chinese
  }

  input: FormGroup

  ngOnInit() {
    this.input = new FormGroup({
      pinyin: new FormControl(this.pinyin)
    })
  }
}
