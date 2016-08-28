import { isPriorityVowel } from './vowel'

describe('isPriorityVowel', () => {
  it('is a priority vowel', () => {
    const expected = true

    expect(isPriorityVowel('a')).toBe(expected)
    expect(isPriorityVowel('e')).toBe(expected)
  })

  it("isn't a priority vowel", () => {
    const expected = false

    expect(isPriorityVowel('i')).toBe(expected)
    expect(isPriorityVowel('o')).toBe(expected)
    expect(isPriorityVowel('u')).toBe(expected)
    expect(isPriorityVowel('v')).toBe(expected)
  })
})
