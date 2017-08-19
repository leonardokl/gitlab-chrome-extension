import { combineReducers } from 'redux'
import { handleAction, handleActions } from 'redux-actions'
import T from 'lodash/fp/T'
import F from 'lodash/fp/F'
import get from 'lodash/fp/get'
import flip from 'lodash/flip'
import merge from 'lodash/fp/merge'
import concat from 'lodash/fp/concat'
import uniq from 'lodash/uniq'
import omit from 'lodash/fp/omit'
import equals from 'lodash/fp/equals'
import filter from 'lodash/fp/filter'
import negate from 'lodash/fp/negate'
import * as actions from './actions'
import { Pages } from 'constants'

const page = combineReducers({
  selected: handleAction(actions.setPage, flip(get('payload.page')), Pages.landing),

  accessToken: combineReducers({
    error: handleActions({
      [actions.requestUser]: F,
      [actions.requestUserError]: T,
      [actions.requestUserSuccess]: F
    }, false),

    loading: handleActions({
      [actions.requestUser]: T,
      [actions.requestUserError]: F,
      [actions.requestUserSuccess]: F
    }, false)
  })
})

const user = combineReducers({
  data: handleActions({
    [actions.requestUserSuccess]: flip(get('payload')),
    [actions.removeTokenSuccess]: () => ({})
  }, {}),

  loading: handleActions({
    [actions.requestUser]: T,
    [actions.requestUserError]: F,
    [actions.requestUserSuccess]: F
  }, false)
})

const issueMessage = handleActions({
  [actions.setIssueMessage]: flip(get('payload'))
}, null)

const projects = combineReducers({
  ids: handleActions({
    [actions.swapPinnedProjects]: (state, { payload }) => {
      const [firstId, secondId] = payload

      return state.map(id => {
        if (id === firstId) return secondId
        if (id === secondId) return firstId

        return id
      })
    },
    [actions.loadProjects]: flip(get('payload')),
    [actions.requestProjectsSuccess]: (state, { payload: { result } }) => uniq([...state, ...result]),
    [actions.pinProject]: (state, { payload: { id } }) => [id, ...state.filter(i => i !== id)],
    [actions.unpinProject]: (state, { payload: { id } }) => [...state.filter(i => i !== id), id]
  }, []),

  loading: handleActions({
    [actions.loadProjects]: T,
    [actions.requestProjects]: T,
    [actions.requestProjectsError]: F,
    [actions.requestProjectsSuccess]: F
  }, false),

  nextPage: handleActions({
    [actions.loadProjects]: () => 1,
    [actions.requestProjectsSuccess]: flip(get('payload.nextPage'))
  }, 1),
})

const search = combineReducers({
  query: handleActions({
    [actions.loadSearchProjects]: flip(get('payload.query'))
  }, ''),

  ids: handleActions({
    [actions.loadSearchProjects]: () => [],
    [actions.searchProjectsSuccess]: (state, { payload: { result } }) => concat(state, result)
  }, []),

  loading: handleActions({
    [actions.searchProjects]: T,
    [actions.searchProjectsError]: F,
    [actions.searchProjectsSuccess]: F
  }, false),

  nextPage: handleActions({
    [actions.loadSearchProjects]: () => 1,
    [actions.searchProjectsSuccess]: flip(get('payload.nextPage'))
  }, 1),
})

const todos = combineReducers({
  ids: handleActions({
    [actions.loadTodos]: () => [],
    [actions.requestTodosSuccess]: (state, { payload: { result } }) => concat(state, result),
    [actions.requestMarkTodoAsDoneSuccess]: (state, { payload: { id } }) => filter(negate(equals(id)), state)
  }, []),

  loading: handleActions({
    [actions.loadTodos]: T,
    [actions.requestTodos]: T,
    [actions.requestTodosError]: F,
    [actions.requestTodosSuccess]: F
  }, false),

  markingAsDone: handleActions({
    [actions.requestTodosSuccess]: (state, { payload: { result } }) =>
      result.reduce((acc, currValue) => ({
        ...acc,
        [currValue]: false
      }), state),
    [actions.requestMarkTodoAsDone]: (state, { payload: { id } }) =>
      ({ ...state, [id]: true }),
    [actions.requestMarkTodoAsDoneError]:  (state, { payload: { id } }) =>
      ({ ...state, [id]: false }),
  }, {}),

  nextPage: handleActions({
    [actions.loadTodos]: () => 1,
    [actions.requestTodosSuccess]: flip(get('payload.nextPage'))
  }, 1),

  total: handleActions({
    [actions.requestTodosSuccess]: flip(get('payload.total')),
    [actions.requestMarkTodoAsDoneSuccess]: state => state - 1
  }, 0)
})

const entities = handleAction(actions.updateEntity, (state, { payload: { entities } }) => {
  return merge(state, entities)
}, {})

const newIssue = combineReducers({
  projectId: handleActions({
    [actions.newIssue]: flip(get('payload.id')),
  }, null),

  loading: handleActions({
    [actions.createIssue]: T,
    [actions.createIssueSuccess]: F,
    [actions.createIssueError]: F
  }, false)
})

export default combineReducers({
  user,
  page,
  projects,
  search,
  todos,
  entities,
  issueMessage,
  newIssue,

  gitlabUrl: handleAction(actions.setGitlabUrl, (_, { payload }) => payload, null),

  pinnedProjects: handleActions({
    [actions.loadProjects]: (state, { payload }) => payload.reduce((acc, currValue) => ({
      ...acc,
      [currValue]: true
    }), {}),
    [actions.pinProject]: (state, { payload: { id } }) => merge(state, { [id]: true }),
    [actions.unpinProject]: (state, { payload: { id } }) => omit([id], state)
  }, {}),

  loading: handleAction(actions.load, T, false),

  error: handleAction(actions.load, T, false)
})
