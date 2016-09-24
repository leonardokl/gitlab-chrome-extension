import {
  FETCH_FAVORITE_PROJECTS,
  ADD_PROJECT_TO_FAVORITES,
  REMOVE_PROJECT_FROM_FAVORITES
} from 'constants/action-types'

const initialState = {
  result: [],
  projects: {},
}

const projects = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_FAVORITE_PROJECTS:
    return {...state, ...action.favoriteProjects}
  case REMOVE_PROJECT_FROM_FAVORITES:
  case ADD_PROJECT_TO_FAVORITES:
    return {
      ...state,
      ...action.data.favoriteProjects
    }
  }

  return state
}

export default projects
