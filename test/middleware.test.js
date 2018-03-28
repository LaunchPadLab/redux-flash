import { middleware } from '../src'
import { configureStore } from './helpers'

// Note: most of the middleware functionality is tested via the actions tests.

test('middleware throws if not initialized as a function', () => {
  const createMockStore = configureStore([ middleware ])
  expect(() => createMockStore({})).toThrow()
})