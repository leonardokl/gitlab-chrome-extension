import React, { PropTypes, PureComponent } from 'react'
import { Button, Dropdown, List, Icon } from 'semantic-ui-react'
import { PROJECT_DROPDOWN_OPTIONS } from 'constants'
import PinIcon from './PinIcon'
import './Item.styl'

class Item extends PureComponent {
  handleClick = (evt) => {
    evt.stopPropagation()
    this.props.onClick()
  }

  handleActionClick = (name) => (evt) => {
    evt.stopPropagation()
    this.props.onActionClick(name)
  }

  handlePinClick = () => {
    const { pinned, onPin, onUnpin } = this.props

    return pinned
      ? onUnpin()
      : onPin()
  }

  render () {
    const { name, group, pinned } = this.props

    const IssueButton = () => (
      <Button.Group positive size='mini'>
        <Button
          positive
          content='Issue'
          icon='plus'
          size='mini'
          onClick={this.handleActionClick('newIssue')}
        />
        <Dropdown floating button>
          <Dropdown.Menu>
              {PROJECT_DROPDOWN_OPTIONS.map((opt, i) =>
                <Dropdown.Item
                  {...opt}
                  key={i}
                  onClick={this.handleActionClick(opt.id)}
                />
              )}
            </Dropdown.Menu>
        </Dropdown>
      </Button.Group>
    )

    return (
      <List.Item className='App__Projects_Item' onClick={this.handleClick}>
         <List.Content className='App__Projects_Item_Actions' floated='right'>
          <IssueButton/>
        </List.Content>
        <List.Header>
          {name} <PinIcon active={pinned} onClick={this.handlePinClick}/>
        </List.Header>
        <List.Description>{group}</List.Description>
      </List.Item>
    )
  }
}

Item.propTypes = {
  name: PropTypes.string,
  group: PropTypes.string,
  pinned: PropTypes.bool,
  onClick: PropTypes.func,
  onPin: PropTypes.func,
  onUnpin: PropTypes.func,
  onActionClick: PropTypes.func
}

export default Item
