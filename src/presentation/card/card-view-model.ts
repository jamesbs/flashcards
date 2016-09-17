import { Card } from '../../domain/models'
import { CardViewState } from './card-view-state'
import { IntroCardViewModel } from './intro-card-view-model'
import { QuestionCardViewModel } from './question-card-view-model'

export type CardViewModel = IntroCardViewModel | QuestionCardViewModel
