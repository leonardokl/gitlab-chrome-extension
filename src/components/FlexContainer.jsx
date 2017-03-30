import React, { PropTypes } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import cn from 'classnames'
import { when } from 'utils'
import './FlexContainer.styl'

const FlexContainer = ({
  children,
  fluid,
  className,
  column,
  style,
  customScroll,
  onScrollBottom
}) => {
  const handleScroll = ({ top }) => {
    when(top >= 1, onScrollBottom)
  }

  return (
    <div className={cn('FlexContainer', { fluid, [className]: className, column })} style={style}>
      {customScroll
        ? <Scrollbars onScrollFrame={handleScroll}>{children}</Scrollbars>
        : children
      }
    </div>
  )
}

FlexContainer.propTypes = {
  children: PropTypes.any,
  fluid: PropTypes.bool,
  column: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  customScroll: PropTypes.bool,
  onScrollBottom: PropTypes.func
}

FlexContainer.defaultProps = {
  style: {},
  onScrollBottom: () => 1
}

export default FlexContainer
