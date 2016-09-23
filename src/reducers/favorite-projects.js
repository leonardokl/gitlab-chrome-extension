import {
  ADD_PROJECT_TO_FAVORITES,
  REMOVE_PROJECT_FROM_FAVORITES
} from 'constants/action-types'

const initialState = {
  result: [],
  projects: {},
}

const projects = (state = initialState, action) => {
  switch (action.type) {
  case REMOVE_PROJECT_FROM_FAVORITES:
    return {
      ...state,
      projects: {
        ...state.projects,
        [state.result[action.index]]: false
      },
      result: [
        ...state.result.slice(0, action.index),
        ...state.result.slice(action.index + 1)
      ]
    }
  case ADD_PROJECT_TO_FAVORITES:
    const {project} = action.data
    const normalizedProject = {[project.id]: project}

    return {
      ...state,
      result: [project.id, ...state.result],
      projects: {...state.projects, [project.id]: project}
    }
  }

  return state
}

export default projects
