import {FETCH_ISSUE_BRANCH_NAME} from 'constants/action-types'

const initialState = {
  issueBranchName: ''
}

const app = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_ISSUE_BRANCH_NAME:
    return {...state, issueBranchName: action.data}
  }

  return state
}

export default app
