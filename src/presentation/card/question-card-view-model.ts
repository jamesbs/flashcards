import { LangItem } from '../../domain/models'

export interface QuestionCardViewModel {
  id: string
  type: 'question'
  langItem?: LangItem
  seen?: Date
  completed?: Date
  previous?: string
  next?: string
}
