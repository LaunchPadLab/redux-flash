import { handleActions } from 'redux-actions'
import * as actions from './actions'

const initialState = {
  messages: []
}

// Reducer
export const reducer = handleActions({
  [actions.FLASH_MESSAGE_ACTION_TYPE]: () => {
    throw new Error('redux-flash: missing middleware. Did you remember to add it when initializing your store?')
  },
  [actions._addMessage]: (state, { payload }) => {
    const messages = [ ...state.messages, payload ]
    return { ...state, messages }
  },
  [actions.removeMessage]: (state, { payload: id }) => {
    const messages = state.messages.filter(m => m.id !== id)
    return { ...state, messages }
  },
  [actions.clearMessages]: (state) => {
    return { ...state, messages: [] }
  },
}, initialState)

// Selectors

// Selectors return the same reference until state.flash.messages changes,
// so useSelector / connect consumers don't re-render on unrelated actions.
function memoizeOnMessages (selector) {
  let lastMessages
  let lastResult
  return (messages) => {
    if (messages !== lastMessages) {
      lastMessages = messages
      lastResult = selector(messages)
    }
    return lastResult
  }
}

export const getFlashMessages = (state) => {
  if (!state.flash) throw new Error('redux-flash: state not found. Did you remember to attach the reducer at key `flash`?')
  return state.flash.messages
}

const selectSuccessMessages = memoizeOnMessages(messages => messages.filter(m => !m.isError))
const selectErrorMessages = memoizeOnMessages(messages => messages.filter(m => m.isError))

export const getSuccessMessages = (state) => selectSuccessMessages(getFlashMessages(state))
export const getErrorMessages = (state) => selectErrorMessages(getFlashMessages(state))
export const getLatestMessage = (state) => {
  const messages = getFlashMessages(state)
  return messages[messages.length - 1]
}
