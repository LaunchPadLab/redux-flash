export {
  flashMessage,
  flashSuccessMessage,
  flashErrorMessage,
  clearMessages,
  removeMessage,
} from './actions'
export { default as flashMessageType } from './flashMessageType'
export { default as middleware } from './middleware'
export {
  reducer,
  getFlashMessages,
  getSuccessMessages,
  getErrorMessages,
  getLatestMessage,
} from './reducer'