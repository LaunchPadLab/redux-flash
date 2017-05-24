import { handleActions } from 'redux-actions'
import {
  addFlash,
  removeFlash,
  clearMessages,
} from './actions'

const initialState = {
  messages: []
}

// Reducer
export const reducer = handleActions({
  [addFlash]: (state, { payload }) => {
    const messages = [ ...state.messages, payload ]
    return { ...state, messages }
  },
  [removeFlash]: (state, { payload: { id }}) => {
    const messages = state.messages.filter(m => m.id !== id)
    return { ...state, messages }
  },
  [clearMessages]: (state) => {
    return { ...state, messages: [] }
  },
}, initialState)

// Selectors
export const getFlashMessages = (state) => {
  if (!state.flash) throw 'redux-flash: state not found. Did you remember to attach the reducer at key `flash`?'  
  return state.flash.messages
}

export const getSuccessMessages = (state) => getFlashMessages(state).filter(m => !m.isError)
export const getErrorMessages = (state) => getFlashMessages(state).filter(m => m.isError)
export const getLatestMessage = (state) => [ ...getFlashMessages(state) ].pop()
