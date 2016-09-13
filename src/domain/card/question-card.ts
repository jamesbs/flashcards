export interface QuestionCard {
  id: string
  type: 'question'
  langItemId: string
  hintCount: number
  failureCount: number
  successCount: number
}
