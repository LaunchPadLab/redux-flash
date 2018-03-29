import _configureStore from 'redux-mock-store'
import { middleware } from '../src'

// Extended version of redux mock store - adds the "getActionTypes" method
export function configureStore (middleware) {
  const mockStore = _configureStore(middleware)
  return function createStore (initialValues) {
    const store = mockStore(initialValues)
    store.getActionTypes = () => store.getActions().map(a => a.type)
    return store
  }
}

// Create mock store with our custom middleware
export function createMockStore (initialState={}, middlewareOptions={}) {
  const createStore = configureStore([ middleware(middlewareOptions) ])
  return createStore(initialState)
} 
