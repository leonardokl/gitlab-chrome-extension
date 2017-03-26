import React, { PropTypes, PureComponent } from 'react'
import { Button, Dropdown, List } from 'semantic-ui-react'
import { PROJECT_DROPDOWN_OPTIONS } from 'constants'
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

  render () {
    const { name, group } = this.props

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
        <List.Header>{name}</List.Header>
        <List.Description>{group}</List.Description>
      </List.Item>
    )
  }
}

Item.propTypes = {
  name: PropTypes.string,
  group: PropTypes.string,
  onClick: PropTypes.func,
  onActionClick: PropTypes.func
}

export default Item
