import React, { PropTypes } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const FlexContainer = ({ children }) => (
  <div className='FlexContainer'>
    {children}
  </div>
)

FlexContainer.propTypes = {
  children: PropTypes.any
}

export default FlexContainer
