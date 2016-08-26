import { isEqual } from 'lodash'

export const toDeepEqual = function(util, customEqualityTesters) {
  return {
    compare: function(actual, expected) {
      return {
        pass: isEqual(actual, expected),
        message: `Expected ${actual} to be ${expected}`
      }
    }
  }
}
