import { v4 as uuidv4 } from 'uuid'
import * as actions from './actions'

const DEFAULT_TIMEOUT = 3000
const DEFAULT_PROPS = {}

function middleware (options={}) {
  const {
    getState,
    timeout: globalTimeout=DEFAULT_TIMEOUT,
    props: globalProps=DEFAULT_PROPS,
  } = options
  if (getState) throw new Error('redux-flash: Middleware must be initialized as a function.')
  // Handle actions
  return () => next => action => {
    // Only handle actions of special type
    if (action.type !== actions.FLASH_MESSAGE_ACTION_TYPE) return next(action)
    const {
      payload: {
        message,
        options: {
          push=false,
          isError=false,
          timeout=globalTimeout,
          props={},
        }
      }
    } = action
    const id = uuidv4()
    // Dispatch appropriate internal actions
    if (push) next(actions.clearMessages())
    next(actions._addMessage({ id, message, isError, props: { ...globalProps, ...props }}))
    if (timeout) setTimeout(() => next(actions.removeMessage(id)), timeout)
  }
}

export default middleware
