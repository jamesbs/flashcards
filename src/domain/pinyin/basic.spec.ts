import { fromBasic, toBasic } from './basic'
import { Pinyin } from './pinyin'
import { ValueError } from '../../error/value-error'

describe('fromBasic', () => {
  it('base case', () => {
    const expected: Pinyin = { syllable: 'zhong', tone: '1' }

    expect(fromBasic('zhong1')).toEqual(expected)
  })

  it('invalid basic pinyin', () => {
    const expected = new ValueError("'de' is not valid pinyin.")

    expect(() => fromBasic('de')).toThrow(expected)
  })
})

describe('toBasic', () => {
  it('base case', () => {
    const input: Pinyin = { syllable: 'zhong', tone: '1' }
    const expected = 'zhong1'

    expect(toBasic(input)).toBe(expected)
  })
})
