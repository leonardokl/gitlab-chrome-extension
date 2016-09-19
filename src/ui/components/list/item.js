import React from 'react'

const Item = (props) => (
  <div
    style={{padding: 10}}
    className="item"
    onClick={props.onClick}
  >
    <div className="content">
      {props.children}
    </div>
  </div>
)

Item.propTypes = {
  children: React.PropTypes.array,
  onClick: React.PropTypes.func,
}

Item.defaultProps = {
  onClick: () => 1
}

module.exports = Item
