import { combineReducers } from 'redux'
import { handleAction, handleActions } from 'redux-actions'
import T from 'lodash/fp/T'
import F from 'lodash/fp/F'
import get from 'lodash/fp/get'
import flip from 'lodash/flip'
import identity from 'lodash/fp/identity'
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
  data: handleAction(actions.requestUserSuccess, flip(get('payload')), {}),

  loading: handleActions({
      [actions.requestUser]: T,
      [actions.requestUserError]: F,
      [actions.requestUserSuccess]: F
    }, false)
})


const entities = combineReducers({
  byId: handleAction(actions.updateEntity, flip(get('payload')), {}),
  ids: handleAction(actions.updateEntity, flip(get('payload')), {}),
})

export default combineReducers({
  user,
  page,
  entities,

  loading: handleAction(actions.load, T, false),

  error: handleAction(actions.load, T, false)
})
