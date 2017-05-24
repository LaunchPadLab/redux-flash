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

test('getSuccessMessages gets all non-error flash messages', () => {
  expect(getSuccessMessages(STATE)).toEqual(SUCCESS_MESSAGES)
})

test('getErrorMessages gets all error flash messages', () => {
  expect(getErrorMessages(STATE)).toEqual(ERROR_MESSAGES)
})

test('getLatestMessage gets the latest flash message', () => {
  expect(getLatestMessage(STATE)).toEqual(LATEST_MESSAGE)
})
