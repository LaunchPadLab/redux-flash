import PropTypes from 'prop-types'
import {
  flashMessage,
  flashMessageType,
} from '../src'
import configureStore from './mockStore'
import thunkMiddleware from 'redux-thunk'

const mockStore = configureStore([ thunkMiddleware ])

function validatePropType (propType, value) {
  // checkPropTypes will log an error if it fails
  const spy = jest.spyOn(console, 'error')
  PropTypes.checkPropTypes({ value: propType }, { value }, 'prop')
  expect(spy).not.toHaveBeenCalled()
}

test('propTypes match flash message object shape', () => {
  const store = mockStore({})
  store.dispatch(flashMessage('Hi'))
  // Get generated flash message
  const messageObject = store.getActions().pop().payload
  return validatePropType(flashMessageType, messageObject)
  // PropTypes.checkPropTypes({ messageObject: propTypes }, { messageObject })
})