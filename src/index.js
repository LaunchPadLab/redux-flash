export {
  flashMessage,
  flashSuccessMessage,
  flashErrorMessage,
  clearMessages,
  removeMessage,
} from './actions'
export flashMessageType from './flashMessageType'
export middleware from './middleware'
export {
  reducer,
  getFlashMessages,
  getSuccessMessages,
  getErrorMessages,
  getLatestMessage,
} from './reducer'