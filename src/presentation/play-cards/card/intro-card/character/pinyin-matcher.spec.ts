import { generatePinyinMatcher } from './pinyin-matcher'
import { Pinyin } from '../../../../../domain/models'

describe('generatePinyinMatcher', () => {
  it('basic match 1', () => {
    const input: Pinyin = {
      syllable: 'wo',
      tone: '3'
    }
    const matchingInput = 'wo3'

    expect(generatePinyinMatcher(input)(matchingInput)).toBe(true)
  })

  it('basic match 2', () => {
    const input: Pinyin = {
      syllable: 'bing',
      tone: '4'
    }
    const matchingInput = 'bing4'

    expect(generatePinyinMatcher(input)(matchingInput)).toBe(true)
  })

  it('not matching 1', () => {
    const input: Pinyin = {
      syllable: 'wo',
      tone: '3'
    }
    const nonMatchingInput = 'wo2'

    expect(generatePinyinMatcher(input)(nonMatchingInput)).toBe(false)
  })

  it('not matching 2', () => {
    const input: Pinyin = {
      syllable: 'yin',
      tone: '1'
    }
    const nonMatchingInput = 'yang2'

    expect(generatePinyinMatcher(input)(nonMatchingInput)).toBe(false)
  })

  it('not matching 3', () => {
    const input: Pinyin = {
      syllable: 'zai',
      tone: '4'
    }
    const nonMatchingInput = 'jia1'

    expect(generatePinyinMatcher(input)(nonMatchingInput)).toBe(false)
  })

})
