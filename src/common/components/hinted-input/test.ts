export interface Test {
  value: string
  completed: boolean
}

export const fromValue = (value: string) => ({ value, completed: false } as Test)
