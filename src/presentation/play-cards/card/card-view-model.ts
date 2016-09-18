import { Card } from '../../../domain/models'
import { CardViewState } from './card-view-state'
import { IntroCardViewModel } from './intro-card'
import { QuestionCardViewModel } from './question-card'

export type CardViewModel = IntroCardViewModel | QuestionCardViewModel
