import React, { PropTypes } from 'react'
import 'styles/main.styl'

const AppWrapper = ({ children }) => (
  <div className='App'>
    {children}
  </div>
)

AppWrapper.propTypes = {
  children: PropTypes.any
}

export default AppWrapper
