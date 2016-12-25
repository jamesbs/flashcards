import { toStandard, findApplyIndex } from './standard'
import { Pinyin } from '../../domain/entities'

describe('findApplyIndex', () => {
  it('ends with normal vowel', () => {
    expect(findApplyIndex('huo')).toBe(2)
  })

  it('normal vowel only', () => {
    expect(findApplyIndex('o')).toBe(0)
  })

  it('normal vowel followed by consonants', () => {
    expect(findApplyIndex('qing')).toBe(1)
  })

  it('ends with a priority vowel only', () => {
    expect(findApplyIndex('ba')).toBe(1)
  })

  it('ends with priority vowel following normal vowel', () => {
    expect(findApplyIndex('bie')).toBe(2)
  })

  it('priority vowel followed by normal vowel', () => {
    expect(findApplyIndex('hao')).toBe(1)
  })

  it('priority vowel followed by consonants', () => {
    expect(findApplyIndex('yang')).toBe(1)
  })

  it('priority vowel only', () => {
    expect(findApplyIndex('e')).toBe(0)
  })

  it('ends with ou', () => {
    expect(findApplyIndex('tou')).toBe(1)
  })
})

describe('toStandard', () => {
  it('ends with vowel', () => {
    const input: Pinyin = { syllable: 'xia', tone: '4' }

    expect(toStandard(input)).toBe('xià')
  })

  it('only vowel', () => {
    const input: Pinyin = { syllable: 'e', tone: '4' }

    expect(toStandard(input)).toBe('è')
  })

  it('ends with consonant', () => {
    const input: Pinyin = { syllable: 'wang', tone: '3' }

    expect(toStandard(input)).toBe('wǎng')
  })

  it('ends with ou', () => {
    const input: Pinyin = { syllable: 'tou', tone: '2' }

    expect(toStandard(input)).toBe('tóu')
  })
})

