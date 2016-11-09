import React from 'react'

const List = (props) => (
  <div style={{marginTop: 10, marginBottom: 10}} className="ui divided selection list">
    {props.children}
  </div>
)

List.propTypes = {
  children: React.PropTypes.array,
}

module.exports = List
