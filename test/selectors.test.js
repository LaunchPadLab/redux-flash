import {
  getFlashMessages,
  getErrorMessages,
  getSuccessMessages,
  getLatestMessage,
} from '../src'

const LATEST_MESSAGE = {
  message: 'Latest message',
  isError: false,
}
const SUCCESS_MESSAGES = [
  { message: 'success', isError: false },
  LATEST_MESSAGE,
]
const ERROR_MESSAGES = [
  { message: 'failure 1', isError: true },
  { message: 'failure 2', isError: true },
]

const ALL_MESSAGES = [ ...ERROR_MESSAGES, ...SUCCESS_MESSAGES ]

const STATE = { flash: { messages: ALL_MESSAGES } }

test('getFlashMessages gets all flash messages', () => {
  expect(getFlashMessages(STATE)).toEqual(ALL_MESSAGES)
})

test('getFlashMessages throws an error when state is set up incorrectly', () => {
  expect(() => getFlashMessages({})).toThrow()
})

test('getSuccessMessages gets all non-error flash messages', () => {
  expect(getSuccessMessages(STATE)).toEqual(SUCCESS_MESSAGES)
})

test('getErrorMessages gets all error flash messages', () => {
  expect(getErrorMessages(STATE)).toEqual(ERROR_MESSAGES)
})

test('getLatestMessage gets the latest flash message', () => {
  expect(getLatestMessage(STATE)).toEqual(LATEST_MESSAGE)
})

test('selectors return the same reference when flash state has not changed', () => {
  const state = { flash: { messages: ALL_MESSAGES } }
  const nextState = { ...state, other: 'unrelated update' }
  expect(getFlashMessages(nextState)).toBe(getFlashMessages(state))
  expect(getSuccessMessages(nextState)).toBe(getSuccessMessages(state))
  expect(getErrorMessages(nextState)).toBe(getErrorMessages(state))
})

test('selectors return new results when flash messages change', () => {
  const state = { flash: { messages: ALL_MESSAGES } }
  const newError = { message: 'failure 3', isError: true }
  const nextState = { flash: { messages: [ ...ALL_MESSAGES, newError ] } }
  expect(getSuccessMessages(nextState)).toEqual(SUCCESS_MESSAGES)
  expect(getErrorMessages(nextState)).toEqual([ ...ERROR_MESSAGES, newError ])
  expect(getErrorMessages(nextState)).not.toBe(getErrorMessages(state))
  expect(getLatestMessage(nextState)).toBe(newError)
})

test('getLatestMessage does not modify flash state', () => {
  const messages = [ ...ALL_MESSAGES ]
  getLatestMessage({ flash: { messages } })
  expect(messages).toEqual(ALL_MESSAGES)
})

test('getLatestMessage returns undefined when there are no messages', () => {
  expect(getLatestMessage({ flash: { messages: [] } })).toBeUndefined()
})
