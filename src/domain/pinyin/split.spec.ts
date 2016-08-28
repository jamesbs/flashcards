import { splitPinyin } from './split'

describe('split pinyin', () => {
  it('single item', () => {
    const input = 'wo3'
    const expected = [ 'wo3' ]

    expect(splitPinyin(input)).toEqual(expected)
  })

  it('multi item', () => {
    const input = 'wo3men5'
    const expected = [ 'wo3', 'men5' ]

    expect(splitPinyin(input)).toEqual(expected)
  })

  it('multi item multi word', () => {
    const input = 'ming2zi5 shi4 shen2me5'
    const expected = [ 'ming2', 'zi5', 'shi4', 'shen2', 'me5' ]

    expect(splitPinyin(input)).toEqual(expected)
  })
})
