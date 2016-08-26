import { Character } from './character'
import { Word } from './word'
import { fromBasic } from './pinyin'
import { zip } from '../util/collection'
import { Translation } from './translation'
import { SimpleTranslation } from './simple-translation'
import { splitPinyin } from './pinyin'

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
