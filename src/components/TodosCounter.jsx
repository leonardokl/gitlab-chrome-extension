import React, { PropTypes } from 'react'
import { Icon } from 'semantic-ui-react'
import './TodosCounter.styl'
import { toBadge } from 'utils'

const SPACE = 32;

const TodosCounter = ({ count, onClick }) => (
  <Icon.Group
    className='App__TopBar_Todos'
    title={!!count ? `Todos (${toBadge(count)})` : 'Todos'}
  >
    <Icon
      className='todos'
      name='bell outline'
      size='large'
      link
      role="button"
      tabIndex="0"
      aria-label="see your todos"
      onKeyDown={(evt) => evt.keyCode === SPACE ? onClick(evt) : null}
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
