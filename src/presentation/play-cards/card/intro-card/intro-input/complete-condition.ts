import { Test } from './test'

export type CompleteCondition = <T>(tests: Test<T>[]) => boolean

export const allComplete: CompleteCondition
  = <T>(tests: Test<T>[]) => tests.find(test => !test.completed) === undefined

export const anyComplete: CompleteCondition
  = <T>(tests: Test<T>[]) => tests.find(test => test.completed) !== undefined
