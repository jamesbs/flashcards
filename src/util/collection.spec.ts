import { zip } from './collection';

describe('inside util', () => {
  it('true is true?', () => {
    const a1 = [1, 2, 3]
    const a2 = [4, 5, 6]
    
    const expected = [
      [1, 4],
      [2, 5],
      [3, 6],
    ]

    expect(zip(a1, a2)).toEqual(expected)
  })
})
