import { splitPinyin } from './pinyin'

describe('split pinyin', () => {
  it('single item', () => {
    const input = 'wo3'
    const expected = [ 'wo3' ]

    expect(splitPinyin(input)).toEqual(expected)
  })
})
