import React, { PropTypes, PureComponent } from 'react'
import { List } from 'semantic-ui-react'

class Item extends PureComponent {
  render () {
    const { name, group, onClick } = this.props

    return (
      <List.Item onClick={onClick}>
        <List.Header>{name}</List.Header>
        <List.Description>{group}</List.Description>
      </List.Item>
    )
  }
}

Item.propTypes = {
  name: PropTypes.string,
  group: PropTypes.string,
  onClick: PropTypes.func
}

export default Item
