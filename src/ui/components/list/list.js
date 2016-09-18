import React from 'react'

const List = (props) => (
  <div className="ui celled selection list">
    {props.children}
  </div>
)

List.propTypes = {
  children: React.PropTypes.array,
}

module.exports = List
