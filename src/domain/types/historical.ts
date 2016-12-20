export type Historical = Partial<{
  previous: string
  next: string
  seen: Date
  completed: Date
}>

export const asHistorical = ({ previous, next, seen, completed }: Historical) => ({
  previous,
  next,
  seen,
  completed
})
