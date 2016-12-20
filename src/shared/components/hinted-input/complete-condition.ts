import { Test } from './test'

export type CompleteCondition = (tests: Test[]) => boolean

export const allComplete: CompleteCondition
  = (tests: Test[]) => tests.find(test => !test.completed) === undefined

export const anyComplete: CompleteCondition
  = (tests: Test[]) => tests.find(test => test.completed) !== undefined
