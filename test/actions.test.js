import {
  flashMessage,
  flashErrorMessage,
} from '../src'
import {
  CLEAR_MESSAGES_ACTION_TYPE,
  REMOVE_MESSAGE_ACTION_TYPE,
  ADD_MESSAGE_ACTION_TYPE,
} from '../src/actions'
import { createMockStore } from './helpers'

jest.useFakeTimers()

test('flashMessage with push option sends clearMessages event', () => {
  const store = createMockStore()
  store.dispatch(flashMessage('Hi', { push: true }))
  expect(store.getActionTypes()).toEqual([CLEAR_MESSAGES_ACTION_TYPE, ADD_MESSAGE_ACTION_TYPE])
})

test('flashMessage sets default timeout if none is provided', () => {
  const store = createMockStore()
  store.dispatch(flashMessage('Hi'))
  expect(store.getActionTypes()).toEqual([ADD_MESSAGE_ACTION_TYPE])
  jest.advanceTimersByTime(4000)
  expect(store.getActionTypes()).toEqual([ADD_MESSAGE_ACTION_TYPE, REMOVE_MESSAGE_ACTION_TYPE])
})

test('flashMessage sets custom timeout if one is provided in action creator', () => {
  const store = createMockStore()
  store.dispatch(flashMessage('Hi', { timeout: 500 }))
  expect(store.getActionTypes()).toEqual([ADD_MESSAGE_ACTION_TYPE])
  jest.advanceTimersByTime(1000)
  expect(store.getActionTypes()).toEqual([ADD_MESSAGE_ACTION_TYPE, REMOVE_MESSAGE_ACTION_TYPE])
})

test('flashMessage sets custom timeout if one is provided in middleware config', () => {
  const store = createMockStore({}, { timeout: 500 })
  store.dispatch(flashMessage('Hi'))
  expect(store.getActionTypes()).toEqual([ADD_MESSAGE_ACTION_TYPE])
  jest.advanceTimersByTime(1000)
  expect(store.getActionTypes()).toEqual([ADD_MESSAGE_ACTION_TYPE, REMOVE_MESSAGE_ACTION_TYPE])
})

test('flashMessage sets no timeout if "false" is provided', () => {
  const store = createMockStore()
  store.dispatch(flashMessage('Hi', { timeout: false }))
  expect(store.getActionTypes()).toEqual([ADD_MESSAGE_ACTION_TYPE])
  jest.advanceTimersByTime(4000)
  expect(store.getActionTypes()).toEqual([ADD_MESSAGE_ACTION_TYPE])
})

test('flashMessage passes message, isError and props to action', () => {
  const store = createMockStore()
  const message = 'HEY THERE'
  const isError = false
  const props = { foo: 1, bar: 0 }
  store.dispatch(flashMessage(message, { isError, props }))
  const action = store.getActions().pop()
  const { payload } = action
  delete payload.id
  expect(payload).toEqual({ message, isError, props })
})

test('flashErrorMessage sets error message to true', () => {
  const store = createMockStore()
  const message = 'HEY THERE'
  const props = { foo: 1, bar: 0 }
  store.dispatch(flashErrorMessage(message, { props }))
  const action = store.getActions().pop()
  const { payload } = action
  delete payload.id
  expect(payload).toEqual({ message, isError: true, props })
})

test('flashMessage merges props with props from middleware config', () => {
  const store = createMockStore({}, { props: { foo: 1 } })
  store.dispatch(flashMessage('Hi', { props: { bar: 0 } }))
  const action = store.getActions().pop()
  expect(action.payload.props).toEqual({ foo: 1, bar: 0 })
})