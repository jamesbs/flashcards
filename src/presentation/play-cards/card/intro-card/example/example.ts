import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { SimpleTranslation } from '../../../../../domain/entities'
import { getWords } from '../../../../../domain/lang-item'
import { StandardWord, toStandard } from '../../../../../view/standard-word'

@Component({
  selector: 'app-example',
  templateUrl: './example.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  private _example: SimpleTranslation

  @Input()
  get example() {
    return this._example
  }

  set example(example) {
    this._example = example
    this.words = getWords(this.example).map(toStandard)
  }

  // find a way to implement this as a memoized getter
  words: StandardWord[]
}
