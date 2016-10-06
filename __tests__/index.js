/* global describe, it, expect*/

import nock from 'nock'
import store from 'config/store'
import issueReducer from 'reducers/issue'
import * as ActionTypes from '../src/constants/action-types'
import * as actions from '../src/actions'

describe('actions', () => {
  it('should create an action to fetch favorite projects', () => {
    const expectedAction = {
      type: ActionTypes.FETCH_FAVORITE_PROJECTS,
    }

    expect(store.dispatch(actions.fetchFavoriteProjects()))
      .toEqual(expectedAction)
  })
})

describe('issue reducer', () => {
  it('should return the initial state', () => {
    expect(
      issueReducer(undefined, {})
    ).toEqual({branch: ''})
  })

  it('should handle FETCH_ISSUE_BRANCH_NAME', () => {
    const initialState = {branch: ''}
    const branchName = 'git checkout -b test'

    expect(
      issueReducer(initialState, {
        type: ActionTypes.FETCH_ISSUE_BRANCH_NAME,
        data: branchName
      })
    ).toEqual({branch: branchName})
  })
})
