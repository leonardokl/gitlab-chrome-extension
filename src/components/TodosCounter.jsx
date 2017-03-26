import React, { PropTypes } from 'react'
import { Icon } from 'semantic-ui-react'
import './TodosCounter.styl'

const TodosCounter = ({ count, onClick }) => (
  <Icon.Group className='App__TopBar_Todos' title={!!count ? `Todos (${count})` : 'Todos'}>
    <Icon
      className='todos'
      name='bell outline'
      size='large'
      link
      onClick={onClick}
    />
    {!!count &&
      <span className='counter' onClick={onClick}>
        {count > 9
          ? '+9'
          : count
        }
      </span>}
  </Icon.Group>
)

TodosCounter.propTypes = {
  count: PropTypes.number,
  onClick: PropTypes.func
}

export default TodosCounter
