import React from 'react'

const Icon = (props) => (
  <i
    style={props.color ? {color: props.color} : {}}
    className={`${props.className} ${props.name} icon`}
    onClick={props.onClick}
  />
)

Icon.propTypes = {
  className: React.PropTypes.string,
  color: React.PropTypes.string,
  name: React.PropTypes.string,
  onClick: React.PropTypes.func
}

Icon.defaultProps = {
  className: '',
  name: 'gitlab',
  onClick: () => 1
}

module.exports = Icon
