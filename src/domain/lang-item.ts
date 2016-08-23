import { Character } from './character'
import { Word } from './word'
import { fromBasic } from './pinyin'
import { zip } from '../util/collection'
import { Translation } from './translation'
import { SimpleTranslation } from './simple-translation'

export class LangItem implements Translation {
  id = ''
  chinese = ''
  pinyin = ''
  english = ''
  examples: Translation[] = []
}
    
export const getCharacters = (translation: Translation): Character[] =>
  zip(translation.chinese.split(''), splitPinyin(translation.pinyin))
    .map(([ chinese, pinyin ]: [ string, string ]): Character => ({
      chinese,
      pinyin: fromBasic(pinyin)
    }));

export const getWords = (translation: SimpleTranslation): Word[] => {
  const pinyinWords = translation.pinyin.split(' ');
  const chineseCharacters = translation.chinese.split('');
  const englishWords = translation.english.split(' ');

  return pinyinWords
    .reduce((words, pinyinWord) => {
      const word: Word = splitPinyin(pinyinWord)
          .reduce((acc, pinyin) => {
            return [
              ...acc,
              {
                chinese: chineseCharacters[words.length + acc.length],
                pinyin: fromBasic(pinyin),
              }
            ];
          }, [] as Character[]);

      return [
        ...words,
        word
      ];
    }, [] as Word[]);
}

export const splitPinyin = (pinyin: string) => {
  let index = 0;
  let pinyins: string[] = [];
  let current = '';

  pinyin.split(/(\d)/)
    .filter(token => token !== '')
    .map(token => token.trim())
    .forEach(token => {
      if(index === 0) {
        current = token;
        index = 1;
      } else {
        pinyins.push(current + token);
        index = 0;
      }
    })

  return pinyins;
}
