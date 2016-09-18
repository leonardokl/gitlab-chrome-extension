import {
  FETCH_GITLAB_PROJECTS
} from 'constants/action-types'

const initialState = {
  list: []
}

const projects = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_GITLAB_PROJECTS:
    return {...state, list: action.data}
  }

  return state
}

export default projects
