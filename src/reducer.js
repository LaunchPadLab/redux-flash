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
export const getFlashMessages = (state) => state.messages
export const getSuccessMessages = (state) => state.messages.filter(m => !m.isError)
export const getErrorMessages = (state) => state.messages.filter(m => m.isError)
export const getLatestMessage = (state) => [ ...state.messages ].pop()
