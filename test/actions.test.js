import {
  flashMessage,
  flashErrorMessage,
} from '../src'
import configureStore from './mock-store'
import thunkMiddleware from 'redux-thunk'

const mockStore = configureStore([ thunkMiddleware ])

jest.useFakeTimers()

test('flashMessage with push option sends clearMessages event', () => {
  const store = mockStore({})
  store.dispatch(flashMessage('Hi', { push: true }))
  expect(store.getActionTypes()).toEqual(['CLEAR_MESSAGES', 'ADD_FLASH'])
})

test('flashMessage sets default timeout if none is provided', () => {
  const store = mockStore({})
  store.dispatch(flashMessage('Hi'))
  expect(store.getActionTypes()).toEqual(['ADD_FLASH'])
  jest.runTimersToTime(4000)
  expect(store.getActionTypes()).toEqual(['ADD_FLASH', 'REMOVE_FLASH'])
})

test('flashMessage sets custom timeout if one is provided', () => {
  const store = mockStore({})
  store.dispatch(flashMessage('Hi', { timeout: 500 }))
  expect(store.getActionTypes()).toEqual(['ADD_FLASH'])
  jest.runTimersToTime(1000)
  expect(store.getActionTypes()).toEqual(['ADD_FLASH', 'REMOVE_FLASH'])
})

test('flashMessage sets no timeout if "false" is provided', () => {
  const store = mockStore({})
  store.dispatch(flashMessage('Hi', { timeout: false }))
  expect(store.getActionTypes()).toEqual(['ADD_FLASH'])
  jest.runTimersToTime(4000)
  expect(store.getActionTypes()).toEqual(['ADD_FLASH'])
})

test('flashMessage passes message, isError and props to action', () => {
  const message = 'HEY THERE'
  const isError = false
  const props = { foo: 1, bar: 0 }
  flashMessage(message, { isError, props })(action => {
    const payload = action.payload
    delete payload.id
    expect(payload).toEqual({ message, isError, props })
  })
})

test('flashErrorMessage sets error message to true', () => {
  const message = 'HEY THERE'
  const props = { foo: 1, bar: 0 }
  flashErrorMessage(message, { props })(action => {
    const payload = action.payload
    delete payload.id
    expect(payload).toEqual({ message, isError: true, props })
  })
})

