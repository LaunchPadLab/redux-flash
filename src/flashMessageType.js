import PropTypes from 'prop-types'

const flashMessageType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  props: PropTypes.object.isRequired,
})

export default flashMessageType