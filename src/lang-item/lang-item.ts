import { Character } from './character';
import { fromBasic } from './pinyin';
import { zip } from '../util/collection';
import { Translation } from './translation';

export class LangItem implements Translation {
  id = '';
  chinese = '';
  pinyin = '';
  english = '';
  examples: Translation[] = [];
}
    
export const getCharacters = (langItem: LangItem): Character[] =>
  zip(langItem.chinese.split(''), splitPinyin(langItem.pinyin))
    .map(([ chinese, pinyin ]: [ string, string ]): Character => ({
      chinese,
      pinyin: fromBasic(pinyin)
    }));

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
