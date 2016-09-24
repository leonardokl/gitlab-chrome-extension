import {
  FETCH_GITLAB_PROJECTS,
  TOGGLE_PROJECT_FAVORITE,
  SEARCH_GITLAB_PROJECTS,
  SEARCH_GITLAB_PROJECTS_REQUEST
} from 'constants/action-types'

const initialState = {
  list: [],
  searching: false
}
// ...state.alternatives.slice(0, action.index),
// ...state.alternatives.slice(action.index + 1)
const projects = (state = initialState, action) => {
  switch (action.type) {
  case SEARCH_GITLAB_PROJECTS:
  case FETCH_GITLAB_PROJECTS:
    return {...state, list: action.data, searching: false}
  case TOGGLE_PROJECT_FAVORITE:
    const {index, project} = action.data

    return {
      ...state,
      list: [
        ...state.list.slice(0, index),
        project,
        ...state.list.slice(index + 1)
      ]
    }

  case SEARCH_GITLAB_PROJECTS_REQUEST:
    return {...state, searching: true}
  }

  return state
}

export default projects
