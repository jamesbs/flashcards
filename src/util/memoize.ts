import { memoize as memo, isEqual } from 'lodash'

const defaultResolver = (...args: any[]) => args

export const memoize = (func: Function, resolver: Function = defaultResolver) =>
  memo(func, resolver)
