export type Tone = '1' | '2' | '3' | '4' | '5';

export const isTone = (tone: string) =>
    ['1', '2', '3', '4', '5'].indexOf(tone) !== -1
