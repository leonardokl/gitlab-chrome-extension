import React from 'react'

const Item = (props) => (
  <div
    style={{padding: 10}}
    className={`${props.className} item`}
    onClick={props.onClick}
  >
    <div className='content'>
      {props.children}
    </div>
  </div>
)

Item.propTypes = {
  children: React.PropTypes.array,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
}

Item.defaultProps = {
  className: '',
  onClick: () => 1
}

module.exports = Item
