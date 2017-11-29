// Extended version of redux mock store - adds the "getActionTypes" method

import defaultConfigureStore from 'redux-mock-store'

function configureStore (middleware) {
  const mockStore = defaultConfigureStore(middleware)
  return function createStore (initialValues) {
    const store = mockStore(initialValues)
    store.getActionTypes = () => store.getActions().map(a => a.type)
    return store
  }
}

export default configureStore
