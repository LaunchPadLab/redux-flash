import {
  addFlash,
  removeFlash,
  clearMessages,
} from '../src/actions'
import {
  reducer,
  flashMessage,
  flashErrorMessage,
} from '../src'
import configureStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const mockStore = configureStore([ thunkMiddleware ])

jest.useFakeTimers()

test('addFlash adds new flash messages correctly', () => {
  const PRIOR_MESSAGES = [{ message: 'Foo'}, { message: 'Bar' }]
  const NEW_MESSAGE = { message: 'New message' }
  const initialState = { messages: PRIOR_MESSAGES }
  const newState = reducer(initialState, addFlash(NEW_MESSAGE))
  expect(newState).toEqual({ messages: [ ...PRIOR_MESSAGES, NEW_MESSAGE ] })
})

test('reducer removes flash messages correctly', () => {
  const PRIOR_MESSAGES = [{ message: 'Foo', id: 0 }, { message: 'Bar', id: 1 }]
  const TO_REMOVE = { message: 'New message', id: 2 }
  const initialState = { messages: [ ...PRIOR_MESSAGES, TO_REMOVE ] }
  const newState = reducer(initialState, removeFlash(2))
  expect(newState).toEqual({ messages: PRIOR_MESSAGES })
})

test('reducer clears flash messages correctly', () => {
  const PRIOR_MESSAGES = [{ message: 'Foo', id: 0 }, { message: 'Bar', id: 1 }]
  const initialState = { messages: PRIOR_MESSAGES }
  const newState = reducer(initialState, clearMessages())
  expect(newState).toEqual({ messages: [] })
})


// test('flashMessage with push option sends clearMessages event', () => {
//   const store = mockStore({
//     flash: [{ id: 0, message: 'Should be removed.' }]
//   })
//   store.dispatch(flashMessage('Hi', {
//     push: true,
//   }))
//   const dispatchedTypes = store.getActions().map(a => a.type)
//   expect(dispatchedTypes).toEqual(['CLEAR_MESSAGES', 'ADD_FLASH'])
// })

// test('flashMessage sets default timeout if none is provided', () => {
//   const dispatchedTypes = []
//   const dispatch = dispatchIntoArray(dispatchedTypes)
//   flashMessage('Hi')(dispatch)
//   expect(dispatchedTypes).toEqual(['ADD_FLASH'])
//   jest.runTimersToTime(4000)
//   expect(dispatchedTypes).toEqual(['ADD_FLASH', 'REMOVE_FLASH'])
// })

// test('flashMessage sets custom timeout if one is provided', () => {
//   const dispatchedTypes = []
//   const dispatch = dispatchIntoArray(dispatchedTypes)
//   flashMessage('Hi', { timeout: 500 })(dispatch)
//   expect(dispatchedTypes).toEqual(['ADD_FLASH'])
//   jest.runTimersToTime(1000)
//   expect(dispatchedTypes).toEqual(['ADD_FLASH', 'REMOVE_FLASH'])
// })

// test('flashMessage sets no timeout if "false" is provided', () => {
//   const dispatchedTypes = []
//   const dispatch = dispatchIntoArray(dispatchedTypes)
//   flashMessage('Hi', { timeout: false })(dispatch)
//   expect(dispatchedTypes).toEqual(['ADD_FLASH'])
//   jest.runTimersToTime(4000)
//   expect(dispatchedTypes).toEqual(['ADD_FLASH'])
// })

// test('flasMessage passes message, isError and props to action', () => {
//   const message = 'HEY THERE'
//   const isError = false
//   const props = { foo: 1, bar: 0 }
//   flashMessage(message, { isError, props })((action) => {
//     if (action.type !== 'ADD_FLASH') return
//     const payload = action.payload
//     delete payload.id
//     expect(payload).toEqual({ message, isError, props })
//   })
// })

// test('flashErrorMessage sets error message to true', () => {
//   const message = 'HEY THERE'
//   const props = { foo: 1, bar: 0 }
//   flashErrorMessage(message, { props })((action) => {
//     if (action.type !== 'ADD_FLASH') return
//     const payload = action.payload
//     delete payload.id
//     expect(payload).toEqual({ message, isError: true, props })
//   })
// })

