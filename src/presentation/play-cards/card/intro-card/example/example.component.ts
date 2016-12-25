import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { Translation } from '../../../../../domain/entities'
import { fromPhrase } from '../../../../../domain/word'
import { StandardWord, toStandard } from '../../../../../domain/word/standard-word'

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  private _example: Translation

  @Input()
  get example() {
    return this._example
  }

  set example(example) {
    this._example = example
    this.words = fromPhrase(example).map(toStandard)
  }

  // find a way to implement this as a memoized getter
  words: StandardWord[]
}
