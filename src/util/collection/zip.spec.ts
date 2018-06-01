import { zip } from './zip'

test('basic', () => {
  const a1 = [1, 2, 3]
  const a2 = [4, 5, 6]

  const expected = [
    [1, 4],
    [2, 5],
    [3, 6],
  ]

  expect(zip(a1, a2)).toEqual(expected)
})

test('uneven arrays - 1st longer', () => {
  const a1 = [ 1, 2, 3 ]
  const a2 = [ 4, 5 ]

  const expected = [
    [1, 4],
    [2, 5],
  ]

  expect(zip(a1, a2)).toEqual(expected)
})

test('uneven arrays - 2nd longer', () => {
  const a1 = [ 1, 2 ]
  const a2 = [ 4, 5, 6 ]

  const expected = [
    [1, 4],
    [2, 5],
  ]

  expect(zip(a1, a2)).toEqual(expected)
})

test('differently typed arrays', () => {
  const a1 = [ 'a', 'b', 'c' ]
  const a2 = [ [ 1, 2 ], [ 2, 3 ] ]

  const expected = [ [ 'a', [ 1, 2 ] ], [ 'b' , [ 2, 3 ] ] ]

  ;(<any>expect(zip(a1, a2))).toEqual(expected)
})
