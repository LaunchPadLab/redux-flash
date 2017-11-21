# redux-flash
*Redux action creators for displaying flash messages.*

[![NPM version](https://img.shields.io/npm/v/redux-flash.svg?style=flat-square)](https://www.npmjs.com/package/redux-flash)

This library provides a simple way to manage flash messages in Redux applications. It includes action creators for creating configurable flash messages as well as selectors for accessing those messages from anywhere in your application.

## Example

```javascript

import { createStore, combineReducers } from 'redux'
import {
    reducer as flashReducer,
    flashMessage,
    getFlashMessages,
} from 'redux-flash'

// First, include the flash reducer keyed under 'flash' in your root reducer

const reducer = combineReducers({
    flash: flashReducer
    ...
})

const store = createStore(reducer, {})

// Now you can dispatch flash actions

const action = flashMessage('This is a test message!')
store.dispatch(action)

// And access messages from the state

const state = store.getState()

getFlashMessages(state)
// =>
// [{
//    id: 1495649041702,
//    message: 'This is a test message!',
//    isError: false,
//    props: {}
// }]

```

## API

### Action creators

`redux-flash` exposes the following action creators:

- `flashMessage(message, options)`: Create a flash message with a given message string.
- `flashErrorMessage(message, options)`: Create a flash message with the `isError` option flag set to `true`.
- `flashSuccessMessage(message, options)`: An alias for `flashMessage()`.
- `clearMessages()`: Clear all flash messages.
- `removeMessage(messageID)`: Clear a particular flash messages.

The `options` object passed to these action creators may contain the following attributes:

- `push`: A flag indicating that *only* the new message should be shown. Internally calls `clearMessages()` before adding the new message.
- `isError`: A flag indicating whether the message is an error message.
- `timeout`: A timeout (ms) after which the message will be removed (default: `3000`). If this value is `false`, the message will persist indefinitely.
- `props`: Any additional values to pass to the message object.

### Selectors

`redux-flash` exposes the following state selectors:

- `getFlashMessages`: Retrieves all flash messages from the state.
- `getSuccessMessages`: Retrieves all flash messages from the state where `isError: false`.
- `getErrorMessages`: Retrieves all flash messages from the state where `isError: true`.
- `getLatestMessage`: Retrieves the last flash message that was added to the state.

Message objects returned by these selectors will have the following format:
```javascript
{
   id: 1495649041702, // A unique ID
   message: 'This is a test message!', // The message text
   isError: false, // Whether the message is an error
   props: {} // Any additional values you passed in your action creator
}
```

### Reducer

`redux-flash` exposes a reducer to handle the actions it creates. This reducer must be attached to your root reducer using the key `flash` in order for the library to function (see [example](#example)).

## Displaying messages in the view

`redux-flash` only handles the creation and storage of flash messages, and contains no display logic. Here's a simple example of how such logic could be implemented using `react-redux`:

```javascript

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getLatestMessage } from 'redux-flash'

function FlashMessages ({ flash }) {
    return (
        <div>
        {
            flash && <div>{ flash.message }</div>
        }
        </div>
    )
}

FlashMessages.propTypes = {
    flash: PropTypes.shape({
        message: PropTypes.string.isRequired
    })
}

function mapStateToProps (state) {
    return {
        flash: getLatestMessage(state)
    }
}

export default connect(mapStateToProps)(FlashMessage)

```
