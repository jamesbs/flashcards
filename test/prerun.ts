import * as customMatchers from './custom-matchers';

beforeEach(() => {
  jasmine.addMatchers(customMatchers as any)
})
