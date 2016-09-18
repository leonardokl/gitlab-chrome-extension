import React from 'react'

const Item = (props) => (
  <div style={{padding: 10}} className="item">
    <div className="content">
      {props.children}
    </div>
  </div>
)

Item.propTypes = {
  children: React.PropTypes.array,
}

module.exports = Item
