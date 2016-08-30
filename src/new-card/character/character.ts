import { Component, Input } from '@angular/core'
import { Character } from '../../domain/models'
import { toStandard } from '../../domain/pinyin'

@Component({
  selector: 'app-character',
  templateUrl: './character.html'
})
export class CharacterView {
  @Input() character: Character

  get chinese() {
    return this.character.chinese
  }

  get pinyin() {
    return toStandard(this.character.pinyin)
  }
}
