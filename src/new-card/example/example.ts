import { Component, Input } from '@angular/core'
import { SimpleTranslation } from '../../domain/models'
import { getWords } from '../../domain/lang-item'
import { toStandard } from '../../domain/pinyin'

@Component({
  selector: 'app-example',
  templateUrl: './example.html'
})
export class Example {
  @Input() example: SimpleTranslation

  get words() {
    return getWords(this.example)
      .map(word =>
        word.map(({ chinese, pinyin }) => ({
          chinese,
          pinyin: toStandard(pinyin)
        })))
  }
}
