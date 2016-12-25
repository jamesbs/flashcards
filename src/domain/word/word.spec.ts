import { fromPhrase } from './word'

describe('fromPhrase', () => {
  it('single word', () => {
    const input = {
      chinese: '我们',
      pinyin: 'wo3men5',
      english: 'we',
    }

    const expected = [
      [
        { chinese: '我', pinyin: { syllable: 'wo', tone: '3' } },
        { chinese: '们', pinyin: { syllable: 'men', tone: '5' } },
      ]]

   ;(<any>expect(fromPhrase(input))).toDeepEqual(expected)
  })

  it('multiple words', () => {
    const input = {
      chinese: '你好吗',
      pinyin: 'ni3 hao3 ma5',
      english: 'how are you?'
    }

    const expected = [
      [ { chinese: '你', pinyin: { syllable: 'ni', tone: '3' } } ],
      [ { chinese: '好', pinyin: { syllable: 'hao', tone: '3' } } ],
      [ { chinese: '吗', pinyin: { syllable: 'ma', tone: '5' } } ],
    ]

   ;(<any>expect(fromPhrase(input))).toDeepEqual(expected)
  })
})
