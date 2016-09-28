import {
  FETCH_FAVORITE_PROJECTS,
  FETCH_GITLAB_PROJECTS,
  FETCH_GITLAB_PROJECTS_REQUEST,
  FILTER_PROJECTS,
  SEARCH_GITLAB_PROJECTS,
  SEARCH_GITLAB_PROJECTS_REQUEST
} from 'constants/action-types'

const initialState = {
  filter: '',
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
  case FILTER_PROJECTS:
    return {...state, filter: action.data.name}
  case SEARCH_GITLAB_PROJECTS:
  case FETCH_GITLAB_PROJECTS:
    return {...state, list: action.data, searching: false, fetching: false}
  case SEARCH_GITLAB_PROJECTS_REQUEST:
    return {...state, searching: true}
  }

  return state
}

export default projects

const projectHasName = (project, name) =>
  project.name.search(name) !== -1

const projectHasNameSpace = (project, name) =>
  project.nameSpace.search(name) !== -1

const filterProjects = (projects, filter) =>
  projects.filter(project => (
    projectHasName(project, filter) || projectHasNameSpace(project, filter)
  ))

export const getVisibleProjects = (state) => {
  const {filter} = state
  const projects = state.list

  if (state.filter === '')
    return state

  return {
    ...state,
    list: filterProjects(projects, filter)
  }
}
