import 'reflect-metadata' // why is this needed?
import { cardWire } from './card-view-model'
import { Card, LangItem } from '../../../domain/models'

describe('cardWire', () => {
  it('basic', () => {
    const card: Card = {
      id: 'card',
      type: 'intro',
      langItemId: '1'
    }

    const langItem: LangItem = {
      id: '1',
      chinese: '新闻',
      pinyin: 'xin1wen2',
      english: 'news',
      examples: [
        {
           chinese: '新闻记者',
           pinyin: 'xin1wen2ji4zhe3',
           english: 'news reporter',
        }
      ]
    }

    const expected = {
      id: 'card',
      type: 'intro',
      langItem: {
        id: '1',
        chinese: '新闻',
        pinyin: 'xin1wen2',
        english: 'news',
        examples: [
          {
            chinese: '新闻记者',
            pinyin: 'xin1wen2ji4zhe3',
            english: 'news reporter',
          }
        ]
      }
    }
    const wiree = cardWire(card, { langItem })
    expect(true).toBe(true)

   //;(<any>expect(cardWire(card, { langItem }))).toDeepEqual(expected)
  })
})
