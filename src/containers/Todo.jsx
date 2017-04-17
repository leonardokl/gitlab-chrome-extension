import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'
import curry from 'lodash/fp/curry'
import { Todo } from 'components'
import { actions } from 'store'
import * as selectors from 'store/selectors'
import { Button, Dropdown, List, Icon } from 'semantic-ui-react'
import { getTodoLabel, getTodoActionName } from 'utils/todo'

class TodoContainer extends PureComponent {
  handleTodoClick = () => {
    const { data, onOpenTab } = this.props

    onOpenTab(data.target.web_url)
  }

  render () {
    const { data, markingAsDone, onMarkAsRead } = this.props
    return (
      <Todo
        author={data.author.name}
        actionName={getTodoActionName(data)}
        label={getTodoLabel(data)}
        body={data.body}
        onClick={this.handleTodoClick}
        onDone={() => onMarkAsRead(data)}
        markingAsDone={markingAsDone[data.id]}
      />
    )
  }
}

TodoContainer.propTypes = {
  data: PropTypes.object.isRequired,
  markingAsDone: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  markingAsDone: selectors.getTodosMarkingAsDone(state)
})

const mapDispatchToProps = ({
  onOpenTab: actions.openTab,
  onMarkAsRead: actions.requestMarkTodoAsDone
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer)

