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
  zip(langItem.chinese.split(''), langItem.pinyin.split(' '))
    .map(([ chinese, pinyin ]: [ string, string ]): Character => ({
      chinese,
      pinyin: fromBasic(pinyin)
    }));
