import {
  FETCH_FAVORITE_PROJECTS,
  FETCH_GITLAB_PROJECTS,
  FETCH_GITLAB_PROJECTS_REQUEST,
  SEARCH_GITLAB_PROJECTS,
  SEARCH_GITLAB_PROJECTS_REQUEST
} from 'constants/action-types'

const initialState = {
  list: [],
  fetching: false,
  searching: false
}

const projects = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_FAVORITE_PROJECTS:
    return {...state, list: action.denormalizedFavoriteProjects}
  case FETCH_GITLAB_PROJECTS_REQUEST:
    return {...state, fetching: true}
  case SEARCH_GITLAB_PROJECTS:
  case FETCH_GITLAB_PROJECTS:
    return {...state, list: action.data, searching: false, fetching: false}
  case SEARCH_GITLAB_PROJECTS_REQUEST:
    return {...state, searching: true}
  }

  return state
}

export default projects
