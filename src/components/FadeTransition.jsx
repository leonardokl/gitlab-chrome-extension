import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './FadeTransition.styl'

const FadeTransition = ({ children, style, className }) => (
  <ReactCSSTransitionGroup
    className={className}
    style={style}
    transitionName="fade"
    transitionAppear={true}
    transitionAppearTimeout={300}
    transitionEnter={false}
    transitionLeave={false}
  >
    {children}
  </ReactCSSTransitionGroup>
)

FadeTransition.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.object,
  className: PropTypes.string
}

FadeTransition.defaultProps = {
  style: {}
}

export default FadeTransition
