import {
  reducer,
} from '../src'
import {
  flashMessage,
  _addMessage,
  removeMessage,
  clearMessages,
} from '../src/actions'


test('reducer throws when middleware is not attached', () => {
  // flashMessage() only reaches reducer if middleware is missing
  const initialState = { messages: [] }
  expect(() => reducer(initialState, flashMessage())).toThrow()
})

test('reducer adds new flash messages correctly', () => {
  const PRIOR_MESSAGES = [{ message: 'Foo'}, { message: 'Bar' }]
  const NEW_MESSAGE = { message: 'New message' }
  const initialState = { messages: PRIOR_MESSAGES }
  const newState = reducer(initialState, _addMessage(NEW_MESSAGE))
  expect(newState).toEqual({ messages: [ ...PRIOR_MESSAGES, NEW_MESSAGE ] })
})

test('reducer removes flash messages correctly', () => {
  const PRIOR_MESSAGES = [{ message: 'Foo', id: 0 }, { message: 'Bar', id: 1 }]
  const TO_REMOVE = { message: 'New message', id: 2 }
  const initialState = { messages: [ ...PRIOR_MESSAGES, TO_REMOVE ] }
  const newState = reducer(initialState, removeMessage(2))
  expect(newState).toEqual({ messages: PRIOR_MESSAGES })
})

test('reducer clears flash messages correctly', () => {
  const PRIOR_MESSAGES = [{ message: 'Foo', id: 0 }, { message: 'Bar', id: 1 }]
  const initialState = { messages: PRIOR_MESSAGES }
  const newState = reducer(initialState, clearMessages())
  expect(newState).toEqual({ messages: [] })
})
