import { createAction } from 'redux-actions'

export const FLASH_MESSAGE_ACTION_TYPE = '@@redux-flash/FLASH'
export const CLEAR_MESSAGES_ACTION_TYPE = '@@redux-flash/CLEAR_MESSAGES'
export const REMOVE_MESSAGE_ACTION_TYPE = '@@redux-flash/REMOVE_MESSAGE'
export const ADD_MESSAGE_ACTION_TYPE = '@@redux-flash/ADD_MESSAGE'

// This action will be picked up by the middleware
export const flashMessage = (message, options={}) => {
  return {
    type: FLASH_MESSAGE_ACTION_TYPE,
    payload: {
      message,
      options,
    }
  }
}

// Pure actions

export const clearMessages = createAction(CLEAR_MESSAGES_ACTION_TYPE)
export const removeMessage = createAction(REMOVE_MESSAGE_ACTION_TYPE)

// Internal actions

export const _addMessage = createAction(ADD_MESSAGE_ACTION_TYPE)

// Aliases 
export const flashSuccessMessage = flashMessage

export const flashErrorMessage = (message, options) => {
  return flashMessage(message, { isError: true, ...options })
}

