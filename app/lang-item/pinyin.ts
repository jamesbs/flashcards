import { ValueError } from '../error/index';
import { Tone, isTone } from './tone';

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
