/* global describe, it, expect*/

import reducer, {initialState} from 'reducers/issue'
import * as ActionTypes from 'constants/action-types'

describe('reducers', () => {
  describe('issue', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {})
      ).toEqual({branch: ''})
    })

    it('should handle FETCH_ISSUE_BRANCH_NAME', () => {
      const branchName = 'git checkout -b test'

      expect(
        reducer(initialState, {
          type: ActionTypes.FETCH_ISSUE_BRANCH_NAME,
          data: branchName
        })
      ).toEqual({branch: branchName})
    })
  })
})
