/* global describe, it, expect*/

import issueReducer from 'reducers/issue'
import * as ActionTypes from 'constants/action-types'

describe('reducers', () => {
  describe('issue', () => {
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
})
