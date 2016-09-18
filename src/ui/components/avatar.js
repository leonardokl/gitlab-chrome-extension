import React from 'react'

const Avatar = (props) => (
  <img className="ui avatar image" src={props.url} />
)

Avatar.propTypes = {
  url: React.PropTypes.string,
}

Avatar.defaultProps = {
  url: ''
}

module.exports = Avatar
