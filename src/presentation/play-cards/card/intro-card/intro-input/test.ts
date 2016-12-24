export type Test<T> = {
  value: T
  display: string
  completed: boolean
}

export const fromValue = <T>(value: T) => ({ value, completed: false } as Test<T>)
