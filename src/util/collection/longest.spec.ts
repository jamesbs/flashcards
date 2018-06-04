import { longest } from './longest'

test('first is longest', () => {
  const input = [ 'longest', 'long', 'short' ]
  const expected = { match: 'longest', index: 0 }

 ;(<any>expect(longest(input))).toEqual(expected)
})

test('last is longest', () => {
  const input = [ 'a long string', 'hello', 'the last will be matched' ]
  const expected = { match: 'the last will be matched', index: 2 }

 ;(<any>expect(longest(input))).toEqual(expected)
})

test('middle is the longest', () => {
  const input = [ 'ab', 'bc', 'cdef', 'fgh', 'ij' ]
  const expected = { match: 'cdef', index: 2 }

 ;(<any>expect(longest(input))).toEqual(expected)
})

test('multiple matches', () => {
  const input = [ 'abra cadabra', 'zoopity zoo', 'magician', 'kapow' ]
  const expected = { match: 'abra cadabra', index: 0}

 ;(<any>expect(longest(input))).toEqual(expected)
})

test('no input', () => {
 (<any>expect(longest([]))).toBe(undefined)
})
