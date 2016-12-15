import { Pinyin, Vowel, isVowel, isPriorityVowel } from '../../domain/pinyin'
import { applyTone } from './pinyin-tone'

export const toStandard = (pinyin: Pinyin) => {
    const matchingIndex = findApplyIndex(pinyin.syllable)

    return pinyin.syllable.slice(0, matchingIndex)
         + applyTone(pinyin.syllable[matchingIndex] as Vowel, pinyin.tone)
         + pinyin.syllable.slice(matchingIndex + 1)
}

export function findApplyIndex(syllable: string): number {
  return isVowelBeforeMatch({ index: syllable.length - 1, syllable })
}

interface BeforeMatchContext {
  index: number
  syllable: string
}

interface AfterMatchContext {
  index: number
  syllable: string
  matchingIndex: number
  vowelGroup?: string
}


const isVowelBeforeMatch = ({ index, syllable }: BeforeMatchContext): number =>
  isVowel(syllable[index])
    ? isPriorityVowelAfterMatch({
        syllable,
        index,
        matchingIndex: index,
    })
    : isVowelBeforeMatch({ syllable, index: index - 1 })

const isPriorityVowelAfterMatch = ({ syllable, index, matchingIndex, vowelGroup }: AfterMatchContext) =>
  isPriorityVowel(syllable[index])
    ? index
    : vowelGroupExists({ syllable, index, matchingIndex, vowelGroup })

const vowelGroupExists = ({ syllable, index, matchingIndex, vowelGroup }: AfterMatchContext) =>
  vowelGroup === undefined
    ? isVowelAfterMatch({ syllable, index: index - 1, matchingIndex: index, vowelGroup: syllable[index] })
    : isOuVowelGroup({ syllable, index, matchingIndex, vowelGroup: syllable[index] + vowelGroup })

const isOuVowelGroup = ({ syllable, index, matchingIndex, vowelGroup }: AfterMatchContext) =>
  vowelGroup === 'ou'
    ? isVowelAfterMatch({ syllable, index: index - 1, matchingIndex: index, vowelGroup })
    : isVowelAfterMatch({ syllable, index: index - 1, matchingIndex, vowelGroup })

const isVowelAfterMatch = ({ syllable, index, matchingIndex, vowelGroup }: AfterMatchContext): number =>
  isVowel(syllable[index])
    ? isPriorityVowelAfterMatch({ syllable, index, matchingIndex, vowelGroup })
    : matchingIndex
