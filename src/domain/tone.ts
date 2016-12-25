export type Tone = '1' | '2' | '3' | '4' | '5'

const toneSet = new Set<Tone>([ '1', '2', '3', '4', '5' ])

export const isTone = (tone: string): tone is Tone =>
  toneSet.has(tone as Tone)
