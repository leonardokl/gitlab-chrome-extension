import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'
import curry from 'lodash/fp/curry'
import throttle from 'lodash/throttle'
import * as selectors from 'store/selectors'
import { Projects } from 'components'
import { actions } from 'store'
import Todo from './Todo'

class TodosContainer extends PureComponent {
  render () {
    const { loading, nextPage, todos, onNextPage } = this.props

    return (
      <Projects
        loading={loading}
        loadingMessage='Loading todos'
        notFoundMessage={`We couldn't find any todo`}
        nextPage={!!nextPage}
        customScroll
        onNextPage={onNextPage}
      >
        {todos.map(todo =>
          <Todo key={todo.id} data={todo}/>
        )}
      </Projects>
    )
  }
}

TodosContainer.propTypes = {
  loading: PropTypes.bool,
  todos: PropTypes.array,
  nextPage: PropTypes.any,
  onNextPage: PropTypes.func
}

const mapStateToProps = state => ({
  loading: selectors.getLoadingTodos(state),
  nextPage: selectors.getTodosNextPage(state),
  todos: selectors.getTodos(state)
})

const mapDispatchToProps = ({
  onNextPage: actions.requestTodos
})

export default connect(mapStateToProps, mapDispatchToProps)(TodosContainer)
