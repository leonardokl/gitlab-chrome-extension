import _ from 'lodash/fp/__'
import get from 'lodash/fp/get'
import getOr from 'lodash/fp/getOr'
import curry from 'lodash/fp/curry'
import { Pages } from 'constants'

export const getEntityById = curry((state, entity, id) => get(`entities.${entity}.${id}`, state))

export const getSelectedPage = get('page.selected')

export const getIssueMessage = get('issueMessage')

// USER
export const getIsValidatingToken = get('page.accessToken.loading')
export const getHasTokenError = get('page.accessToken.error')
export const getLoadingUser = get('page.user.loading')
export const getUser = get('user.data')
export const getAccessToken = get('user.data.accessToken')

// PROJECTS
export const getProjectById = getEntityById(_, 'projects')
export const getProjectsIds = getOr([], 'projects.ids')
export const getProjectsNextPage = get('projects.nextPage')
export const getLoadingProjects = get('projects.loading')
export const getProjects = state => {
  const ids = getProjectsIds(state)
  const getProjectById = getEntityById(state, 'projects')
  const projects = ids.map(getProjectById)

  return projects
}
export const getIsProjectPinned = (state, { id }) => getOr(false, `pinnedProjects.${id}`, state)

// ISSUES
export const getNewIssueProject = (state) => {
  const projectId = get('newIssue.projectId', state)

  return getProjectById(state, projectId)
}
export const getNewIssueProjectNameSpace = (state) => {
  const project = getNewIssueProject(state)
  const name = get('name', project)
  const group = get('namespace.name', project)

  return `${group}/${name}`
}
export const getIsCreatingIssue = get('newIssue.loading')

// SEARCH
export const getQuery = get('search.query')
export const getSearchIds = getOr([], 'search.ids')
export const getSearchNextPage = get('search.nextPage')
export const getLoadingSearch = get('search.loading')
export const getSearchProjects = state => {
  const ids = getSearchIds(state)
  const getProjectById = getEntityById(state, 'projects')
  const projects = ids.map(getProjectById)

  return projects
}

// todos
export const getTodosCount = state => state.todos.ids.length
