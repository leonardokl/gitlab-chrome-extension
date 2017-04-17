import React, { PropTypes, PureComponent } from 'react'
import { Button, Dropdown, List, Icon } from 'semantic-ui-react'
import { stopPropagation } from 'utils'
import './Todo.styl'

const Todo = ({ author, actionName, label, body, markingAsDone, onClick, onDone }) => (
  <List.Item className='Todo' onClick={onClick}>
    <List.Content style={{ display: 'flex' }}>
      <div>
        <div className='Todo_Title'>
          <strong>{author}</strong> {actionName} <strong>{label}</strong>
        </div>
        <div className='Todo_Body'>
          {body}
        </div>
      </div>
      <div className='Todo_Actions'>
        <Button
          basic
          size='mini'
          content='Done'
          disabled={markingAsDone}
          loading={markingAsDone}
          onClick={stopPropagation(onDone)}
        />
      </div>
    </List.Content>
  </List.Item>
)

Todo.propTypes = {
  author: PropTypes.string.isRequired,
  actionName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  markingAsDone: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
}

export default Todo

