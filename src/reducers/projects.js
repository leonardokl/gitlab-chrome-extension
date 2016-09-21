import {
  FETCH_GITLAB_PROJECTS,
  ADD_PROJECT_TO_FAVORITES,
  SEARCH_GITLAB_PROJECTS,
  SEARCH_GITLAB_PROJECTS_REQUEST
} from 'constants/action-types'

const initialState = {
  list: [],
  favorites: [],
  searching: false
}

const projects = (state = initialState, action) => {
  switch (action.type) {
  case SEARCH_GITLAB_PROJECTS:
  case FETCH_GITLAB_PROJECTS:
    return {...state, list: action.data, searching: false}
  case ADD_PROJECT_TO_FAVORITES:
    return state
  case SEARCH_GITLAB_PROJECTS_REQUEST:
    return {...state, searching: true}
  }

  return state
}

export default projects
