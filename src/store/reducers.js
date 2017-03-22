import { combineReducers } from 'redux'
import { handleAction, handleActions } from 'redux-actions'
import T from 'lodash/fp/T'
import F from 'lodash/fp/F'
import * as actions from './actions'

export default combineReducers({
  loading: handleAction(actions.load, T, false)
})
