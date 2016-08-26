import * as customMatchers from './matchers';

beforeEach(() => {
  jasmine.addMatchers(customMatchers as any)
})
