import { isEqual } from 'lodash'

export const toDeepEqual = function<T1, T2>(util: T1, customEqualityTesters: T2) {
  return {
    compare: function(actual, expected) {
      return {
        pass: isEqual(actual, expected),
        message: `Expected ${actual.toString()} to be ${expected.toString()}`
      }
    }
  }
}
