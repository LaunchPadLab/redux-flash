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
export const getFlashMessages = (state) => {
  if (!state.flash) throw new Error('redux-flash: state not found. Did you remember to attach the reducer at key `flash`?')
  return [ ...state.flash.messages ]
}

export const getSuccessMessages = (state) => getFlashMessages(state).filter(m => !m.isError)
export const getErrorMessages = (state) => getFlashMessages(state).filter(m => m.isError)
export const getLatestMessage = (state) => getFlashMessages(state).pop()
