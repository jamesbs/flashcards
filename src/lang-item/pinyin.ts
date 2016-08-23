import { ValueError } from '../error/index';
import { Tone, isTone } from './tone';
import { Vowel, isVowel, isPriorityVowel } from './vowel';

export type Pinyin = {
  syllable: string;
  tone: Tone;
}

export const fromBasic = (basic: string): Pinyin => {
  const normalized = basic.trim();
  const tone = normalized.slice(-1);
  
  if(!isTone(tone)) {
    throw new ValueError(basic + " is not valid pinyin.");
  } else {
    return {
      syllable: normalized.slice(0, -1),
      tone: <Tone>tone
    };
  }
}
export const toBasic = (pinyin: Pinyin) => pinyin.syllable + pinyin.tone;

export const toStandard = (pinyin: Pinyin) => {
  if (pinyin.tone === '5') {
    return pinyin.syllable;
  } else {
    const matchingIndex = findApplyIndex(pinyin.syllable)(pinyin.syllable.length - 1);

    const res =  pinyin.syllable.slice(0, matchingIndex)
         + applyTone(pinyin.syllable[matchingIndex] as Vowel, pinyin.tone)
         + pinyin.syllable.slice(matchingIndex + 1);

    return res;   
  }
};

export function applyTone(letter: Vowel, tone: Tone) {
  return letter; 
}

export function findApplyIndex(syllable: string) {
  let matchingVowelIndex = -1;

  const matchVowel = (letter: Vowel, index: number) => {
    if(isPriorityVowel(letter)) {
      return index;
    } else {
      return matchingIndex(index - 1);
    }
  }

  const matchConsonant = (letter: string, index: number)=> {
    if(matchingVowelIndex === -1) {
      return matchingIndex(index - 1);
    } else {
      return matchingVowelIndex;
    }
  }

  const matchingIndex = (index: number) => {
    const letter = syllable[index];
    if(isVowel(letter)) {
      if(matchingVowelIndex === -1) {
        matchingVowelIndex = index;
      }
      return matchVowel(letter as Vowel, index);
    } else if(index < 0) {
      return matchingVowelIndex;
    } else {
      return matchConsonant(letter, index);
    }
  };

  return matchingIndex;
}
