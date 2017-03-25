import React, { PropTypes } from 'react'

const NotFound = ({ text }) => (
  <div className='App__Projects_NotFound'>
    {text}
  </div>
)

NotFound.propTypes = {
  text: PropTypes.string
}

export default NotFound
