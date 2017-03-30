import React, { PropTypes } from 'react'
import cn from 'classnames'
import './FlexItem.styl'

const FlexItem = ({ children, fluid, style, className }) => (
  <div style={style} className={cn('FlexItem', { fluid,  [className]: className })}>
    {children}
  </div>
)

FlexItem.propTypes = {
  children: PropTypes.any,
  fluid: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
}

FlexItem.defaultProps = {
  style: {}
}

export default FlexItem
