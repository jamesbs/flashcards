import { FormControl } from '@angular/forms'
import { Pinyin, toBasic } from '../../../domain/pinyin'

export const isValid = (pinyin: Pinyin) => {
  const basicPinyin = toBasic(pinyin)

  return (control: FormControl) =>
    control.value === basicPinyin
      ? undefined
      : { invalid: "Value entered doesn't match." }
}
