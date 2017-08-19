import _ from 'lodash/fp/__'
import get from 'lodash/fp/get'
import getOr from 'lodash/fp/getOr'
import curry from 'lodash/fp/curry'
import pipe from 'lodash/fp/pipe'
import { Pages, GITLAB_API_ENDPOINT } from 'constants'

export const getEntityById = curry((state, entity, id) => get(`entities.${entity}.${id}`, state))

export const mapIdsToEntities = curry((entity, getIdsSelector, state) => {
  const ids = getIdsSelector(state)
  const list = ids.map(getEntityById(state, entity))

  return list
})

export const getGitlabUrl = get('gitlabUrl')
export const getGitlabApiUrl = pipe(
  getGitlabUrl,
  (url) => `${url}/${GITLAB_API_ENDPOINT}`
)

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
export const getProjects = mapIdsToEntities('projects', getProjectsIds)
export const getIsProjectPinned = (state, { id }) => getOr(false, `pinnedProjects.${id}`, state)

// ISSUES
export const getNewIssueProject = (state) => {
  const projectId = get('newIssue.projectId', state)

  return getProjectById(state, projectId)
}
export const getNewIssueProjectNameSpace = pipe(getNewIssueProject, get('path_with_namespace'))
export const getIsCreatingIssue = get('newIssue.loading')

// SEARCH
export const getQuery = get('search.query')
export const getSearchIds = getOr([], 'search.ids')
export const getSearchNextPage = get('search.nextPage')
export const getLoadingSearch = get('search.loading')
export const getSearchProjects = mapIdsToEntities('projects', getSearchIds)

// TODOS
export const getTodosCount = state => state.todos.total
export const getTodosIds = getOr([], 'todos.ids')
export const getTodosNextPage = get('todos.nextPage')
export const getLoadingTodos = get('todos.loading')
export const getTodos = mapIdsToEntities('todos', getTodosIds)
export const getTodosMarkingAsDone = get('todos.markingAsDone')
