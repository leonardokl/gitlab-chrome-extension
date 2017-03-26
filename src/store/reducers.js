import { combineReducers } from 'redux'
import { handleAction, handleActions } from 'redux-actions'
import T from 'lodash/fp/T'
import F from 'lodash/fp/F'
import get from 'lodash/fp/get'
import flip from 'lodash/flip'
import merge from 'lodash/fp/merge'
import concat from 'lodash/fp/concat'
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

const projects = combineReducers({
  ids: handleActions({
    [actions.loadProjects]: () => [],
    [actions.requestProjectsSuccess]: (state, { payload: { result } }) => concat(state, result)
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
    [actions.requestTodosSuccess]: flip(get('payload.result')),
  }, [])
})

const entities = handleAction(actions.updateEntity, (state, { payload: { entities } }) => {
  return merge(state, entities)
}, {})

export default combineReducers({
  user,
  page,
  projects,
  search,
  todos,
  entities,

  loading: handleAction(actions.load, T, false),

  error: handleAction(actions.load, T, false)
})
