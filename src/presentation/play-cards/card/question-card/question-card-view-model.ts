import { LangItem } from '../../../../domain/entities'

export interface QuestionCardViewModel {
  id: string
  type: 'question'
  langItem?: LangItem
  seen?: Date
  completed?: Date
  previous?: string
  next?: string
}
