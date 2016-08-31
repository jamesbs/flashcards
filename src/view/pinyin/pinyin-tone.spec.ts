import { applyTone } from './pinyin-tone'

describe('applyTone', () => {
  it('base case', () => {
    expect(applyTone('a', '1')).toBe('ā')
  })

  it('5th tone has no mapping', () => {
    expect(applyTone('e', '5')).toBe('e')
  })

  it('5th tone has mapping', () => {
    expect(applyTone('v', '5')).toBe('ü')
  })
})
