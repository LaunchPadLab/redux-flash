import { createAction } from 'redux-actions'

const DEFAULT_TIMEOUT = 3000

// Pure actions

export const addFlash = createAction('ADD_FLASH')
export const removeFlash = createAction('REMOVE_FLASH')
export const clearMessages = createAction('CLEAR_MESSAGES')

// Thunks

export const flashMessage = (message, options={}) => {

  const {
    push=false,
    isError=false,
    timeout=DEFAULT_TIMEOUT,
    props={},
  } = options

  const id = Date.now()

  return (dispatch) => {
    if (push) dispatch(clearMessages())
    dispatch(addFlash({ id, message, isError, props }))
    if (timeout) setTimeout(() => dispatch(removeFlash(id)), timeout)
  }
}

// Aliases

export const flashSuccessMessage = flashMessage

export const flashErrorMessage = (message, options) => {
  return flashMessage(message, { isError: true, ...options })
}

export const removeMessage = removeFlash
