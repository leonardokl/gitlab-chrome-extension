import React, { PropTypes } from 'react'
import cn from 'classnames'
import './FlexContainer.styl'

const FlexContainer = ({ children, fluid, className }) => (
  <div className={cn('FlexContainer', { fluid, [className]: className })}>
    {children}
  </div>
)

FlexContainer.propTypes = {
  children: PropTypes.any,
  fluid: PropTypes.bool,
  className: PropTypes.string
}

export default FlexContainer
