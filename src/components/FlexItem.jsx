import React, { PropTypes } from 'react'
import cn from 'classnames'
import './FlexItem.styl'

const FlexItem = ({ children, fluid }) => (
  <div className={cn('FlexItem', { fluid })}>
    {children}
  </div>
)

FlexItem.propTypes = {
  children: PropTypes.any,
  fluid: PropTypes.bool
}

export default FlexItem
