import { Character } from './character';
import { fromBasic } from './pinyin';
import { zip } from '../util/collection';

export class LangItem {
  id: string = "";
  chinese: string = "";
  pinyin: string = "";
  english: string | string[] = "";
}
    
export const getCharacters = (langItem: LangItem): Character[] =>
  zip(langItem.chinese.split(''), langItem.pinyin.split(' '))
    .map(([ chinese, pinyin ]: [ string, string ]): Character => ({
      chinese,
      pinyin: fromBasic(pinyin)
    }));
