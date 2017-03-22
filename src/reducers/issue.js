import { handleAction } from 'redux-actions'

export const initialState = {
  branch: ''
}

export default handleAction('FETCH_ISSUE_BRANCH_NAME', (state, { data }) => ({
  branch: data
}), initialState)
