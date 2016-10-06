import {FETCH_ISSUE_BRANCH_NAME} from 'constants/action-types'

const initialState = {
  branch: ''
}

const app = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_ISSUE_BRANCH_NAME:
    return {...state, branch: action.data}
  }

  return state
}

export default app