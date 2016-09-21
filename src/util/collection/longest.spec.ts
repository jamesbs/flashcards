import { longest } from './longest'

describe('longest', () => {
  it('first is longest', () => {
    const input = [ 'longest', 'long', 'short' ]
    const expected = { match: 'longest', index: 0 }

   ;(<any>expect(longest(input))).toDeepEqual(expected)
  })

  it('last is longest', () => {
    const input = [ 'a long string', 'hello', 'the last will be matched' ]
    const expected = { match: 'the last will be matched', index: 2 }

   ;(<any>expect(longest(input))).toDeepEqual(expected)
  })

  it('middle is the longest', () => {
    const input = [ 'ab', 'bc', 'cdef', 'fgh', 'ij' ]
    const expected = { match: 'cdef', index: 2 }

   ;(<any>expect(longest(input))).toDeepEqual(expected)
  })

  it('multiple matches', () => {
    const input = [ 'abra cadabra', 'zoopity zoo', 'magician', 'kapow' ]
    const expected = { match: 'abra cadabra', index: 0}

   ;(<any>expect(longest(input))).toDeepEqual(expected)
  })

  it('no input', () => {
   ;(<any>expect(longest([]))).toBe(undefined)
  })
})
