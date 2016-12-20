import { Identifiable, Historical, Typed } from '../types'

export type QuestionCard =
    Identifiable
  & Historical
  & Typed<'question'>
  & {
      langItemId: string
      hintCount: number
      failureCount: number
      successCount: number
    }
