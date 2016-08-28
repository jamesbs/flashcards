export type Tone = '1' | '2' | '3' | '4' | '5'

const toneSet = new Set<Tone>([ '1', '2', '3', '4', '5' ])

export function isTone(tone: string) {
    return toneSet.has(tone as Tone)
}
