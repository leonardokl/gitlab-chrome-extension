import { combineReducers } from 'redux'
import { handleAction, handleActions } from 'redux-actions'
import T from 'lodash/fp/T'
import F from 'lodash/fp/F'

export const initialState = {
  filter: '',
  list: [],
  fetching: false,
  searching: false
}

export default combineReducers({
  filter: handleAction('FILTER_PROJECTS', (state, { data: { name }}) => name, ''),

  list: handleActions({
    SEARCH_GITLAB_PROJECTS: (state, { data }) => data,
    FETCH_FAVORITE_PROJECTS: (state, action) => action.denormalizedFavoriteProjects,
    FETCH_GITLAB_PROJECTS: (state, { data }) => data,
  }, []),

  searching: handleActions({
    SEARCH_GITLAB_PROJECTS: F,
    FETCH_GITLAB_PROJECTS: F,
    SEARCH_GITLAB_PROJECTS_REQUEST: T
  }, false),

  fetching: handleActions({
    FETCH_GITLAB_PROJECTS_REQUEST: T,
    ADD_PROJECTS_LOADER: T,
    FETCH_GITLAB_PROJECTS: F,
    SEARCH_GITLAB_PROJECTS: F
  }, false)
})

const projectHasName = (project, name) =>
  project.name.search(name) !== -1

const projectHasNameSpace = (project, name) =>
  project.nameSpace.search(name) !== -1

const filterProjects = (projects, filter) =>
  projects.filter(project => (
    projectHasName(project, filter) || projectHasNameSpace(project, filter)
  ))

export const getVisibleProjects = (state) => {
  const { filter } = state
  const projects = state.list

  if (state.filter === '') return state

  return {
    ...state,
    list: filterProjects(projects, filter)
  }
}
