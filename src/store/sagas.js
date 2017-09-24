import { put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import get from 'lodash/fp/get'
import compose from 'lodash/fp/compose'
import equals from 'lodash/fp/equals'
import { normalize, schema, arrayOf } from 'normalizr'
import * as actions from './actions'
import { Pages, Gitlab, GITLAB_URL } from 'constants'
import {
  chrome,
  gitlab,
  isGitlabUrl,
  isIssueUrl,
  getIssueId,
  notification,
  createBranchName,
  toBadge
} from 'utils'
import {
  getAccessToken,
  getProjectsNextPage,
  getUser,
  getQuery,
  getSearchNextPage,
  getNewIssueProject,
  getTodosNextPage,
  getTodosCount,
  getGitlabUrl,
  getGitlabApiUrl
} from './selectors'
import { projectsSchema, todosSchema } from './schemas'

function* updateUser () {
  const apiUrl = yield select(getGitlabApiUrl)
  const accessToken = yield select(getAccessToken)

  try {
    const { data } = yield gitlab.fetchUser(apiUrl, accessToken)
    const user = { ...data, accessToken }

    yield chrome.storage.set('user', user)
  } catch (err) {
    console.error(err)
  }
}

function* handleLoad () {
  try {
    const gitlabUrl = yield chrome.storage.get('gitlabUrl')

    yield put(actions.setGitlabUrl(gitlabUrl))
  } catch (err) {
    console.error(err)
    notification.basic({
      title: 'Error',
      message: 'An error ocurred trying to get the GitLab URL'
    })
  }

  try {
    const user = yield chrome.storage.get('user')

    yield put(actions.requestUserSuccess(user))
    yield updateUser()
  } catch (err) {
    console.warn(err)
    yield put(actions.setPage(Pages.accessToken))
  }
}


function* handleRequestUser ({ payload: { accessToken } }) {
  try {
    const apiUrl = yield select(getGitlabApiUrl)
    const { data } = yield gitlab.fetchUser(apiUrl, accessToken)
    const user = { ...data, accessToken }

    yield chrome.storage.setPersonalAccessToken(accessToken)
    yield chrome.storage.set('user', user)
    yield chrome.storage.set('pinnedProjects', [])
    yield put(actions.requestUserSuccess(user))
  } catch (err) {
    console.error(err)
    yield put(actions.requestUserError())
    notification.basic({ title: 'Error', message: err.message})
  }
}

function* handleRequestUserSuccess () {
  try {
    const pinnedProjects = yield chrome.storage.get('pinnedProjects')
    const normalizedData = normalize(pinnedProjects, projectsSchema)

    yield put(actions.updateEntity(normalizedData))
    yield put(actions.loadProjects(normalizedData.result))
  } catch (err) {
    console.error(err)
    yield put(actions.loadProjects([]))
  } finally {
    yield [
      put(actions.setPage(Pages.main)),
      put(actions.loadTodos()),
      put(actions.getOpenedTab())
    ]
  }
}

function* handleRemoveToken () {
  yield chrome.storage.clear()
  yield chrome.storage.set('gitlabUrl', GITLAB_URL)
  yield put(actions.setPage(Pages.accessToken))
  yield put(actions.removeTokenSuccess())
  chrome.clearBadge()
}

function* handleGetPersonalToken () {
  const gitlabUrl = yield select(getGitlabUrl)
  const personalTokenUrl = `${gitlabUrl}/profile/personal_access_tokens`

  chrome.openTab(personalTokenUrl)
}

function* handleRequestProjects () {
  const [apiUrl, accessToken, page] = yield [
    select(getGitlabApiUrl),
    select(getAccessToken),
    select(getProjectsNextPage),
  ]

  try {
    const response = yield gitlab.fetchProjects({ apiUrl, accessToken, page })
    const nextPage = response.headers['x-next-page']
    const normalizedData = normalize(response.data, projectsSchema)

    yield put(actions.updateEntity(normalizedData))
    yield put(actions.requestProjectsSuccess({ ...normalizedData, nextPage }))
  } catch (err) {
    console.error(err)
    yield put(actions.requestProjectsError())
    notification.basic({ title: 'Error', message: err.message})
  }
}

function* handleSearchProjects () {
  const [apiUrl, accessToken, page, query] = yield [
    select(getGitlabApiUrl),
    select(getAccessToken),
    select(getSearchNextPage),
    select(getQuery)
  ]

  try {
    const response = yield gitlab.searchProjects({ apiUrl, accessToken, page, query })
    const nextPage = response.headers['x-next-page']
    const normalizedData = normalize(response.data, projectsSchema)

    yield put(actions.updateEntity(normalizedData))
    yield put(actions.searchProjectsSuccess({ ...normalizedData, nextPage }))
  } catch (err) {
    console.error(err)
    yield put(actions.searchProjectsError())
    notification.basic({ title: 'Error', message: err.message})
  } finally {
    yield put(actions.setPage(Pages.search))
  }
}

function* handleLoadSearchProjects ({ payload: { query } }) {
  if (!query) {
    yield put(actions.setPage(Pages.main))
  } else {
    yield put(actions.searchProjects())
  }
}

function* handleOpenProfile () {
  const user = yield select(getUser)
  const gitlabUrl = yield select(getGitlabUrl)

  chrome.openTab(`${gitlabUrl}/${user.username}`)
}

function* handleOpenSettings () {
  const gitlabUrl = yield select(getGitlabUrl)

  chrome.openTab(`${gitlabUrl}/profile`)
}

function* handleRequestTodos () {
  const [apiUrl, accessToken, page] = yield [
    select(getGitlabApiUrl),
    select(getAccessToken),
    select(getTodosNextPage)
  ]

  try {
    const response = yield gitlab.fetchTodos({ apiUrl, accessToken, page })
    const nextPage = response.headers['x-next-page']
    const total = Number(response.headers['x-total'])
    const normalizedData = normalize(response.data, todosSchema)

    chrome.setBadge(toBadge(total))
    yield put(actions.updateEntity(normalizedData))
    yield put(actions.requestTodosSuccess({ ...normalizedData, nextPage, total }))
  } catch (err) {
    console.error(err)
    yield put(actions.requestTodosError())
    notification.basic({ title: 'Error', message: err.message})
  }
}

function* handleOpenTab ({ payload: { url } }) {
  chrome.openTab(url)
}

function* handleOpenGitlabTab ({ payload }) {
  const gitlabUrl = yield select(getGitlabUrl)

  chrome.openTab(`${gitlabUrl}/${payload}`)
}

function* handlePinProject ({ payload }) {
  try {
    const pinnedProjects = yield chrome.storage.get('pinnedProjects')

    chrome.storage.set('pinnedProjects', [payload, ...pinnedProjects])
  } catch (err) {
    console.error(err)
    notification.basic({ title: 'Error', message: err.message})
  }
}

function* handleUnpinProject ({ payload: { id } }) {
  try {
    const pinnedProjects = yield chrome.storage.get('pinnedProjects')

    chrome.storage.set('pinnedProjects', pinnedProjects.filter(i => i.id !== id))
  } catch (err) {
    console.error(err)
  }
}

function* handleSwapPinnedProjects ({ payload }) {
  const [firstId, secondId] = payload

  try {
    const pinnedProjects = yield chrome.storage.get('pinnedProjects')
    const firstProject = pinnedProjects.find(i => i.id === firstId)
    const secondProject = pinnedProjects.find(i => i.id === secondId)

    chrome.storage.set('pinnedProjects', pinnedProjects.map(project => {
      if (project.id === firstId) return secondProject
      if (project.id === secondId) return firstProject

      return project
    }))
  } catch (err) {
    console.error(err)
  }
}

function* handleNewIssue () {
  yield put(actions.setPage(Pages.NEW_ISSUE))
}

function* handleCreateIssue ({ payload: { title, description, assignToMe } }) {
  const [apiUrl, user, accessToken, project] = yield [
    select(getGitlabApiUrl),
    select(getUser),
    select(getAccessToken),
    select(getNewIssueProject)
  ]
  const form = {
    title,
    description,
    id: project.id,
    assignee_id: assignToMe
      ? user.id
      : undefined
  }

  try {
    const response = yield gitlab.createIssue({ ...form, apiUrl, accessToken })

    yield put(actions.createIssueSuccess(response))
    yield put(actions.setPage(Pages.main))
  } catch (err) {
    console.error(err)
    notification.basic({ title: 'Error', message: err.message})
    yield put(actions.createIssueError())
  }
}

function* handleOpenExternalNewIssue () {
  const project = yield select(getNewIssueProject)

  yield put(actions.openTab(`${project.web_url}/issues/new?issue`))
}

function* handleCreateIssueSuccess ({ payload: { data: { iid, title } } }) {
   const branchName = createBranchName(iid, title)

   yield put(actions.setIssueMessage({ id: iid, branchName}))
}

function* handleMarkTodoAsDone ({ payload: { id }}) {
  const accessToken = yield select(getAccessToken)
  const apiUrl = yield select(getGitlabApiUrl)

  try {
    yield gitlab.markAsDone({ apiUrl, id, accessToken })
    yield put(actions.requestMarkTodoAsDoneSuccess({ id }))
  } catch (err) {
    yield put(actions.requestMarkTodoAsDoneError({ id }))
    notification.basic({ title: 'Error', message: err.message })
  }
}

function* handleMarkTodoAsDoneSuccess () {
  const todosCount = yield select(getTodosCount)

  chrome.setBadge(toBadge(todosCount))
}

export default function* () {
  yield [
    takeEvery(actions.load, handleLoad),
    takeEvery(actions.requestUser, handleRequestUser),
    takeEvery(actions.requestUserSuccess, handleRequestUserSuccess),
    takeEvery(actions.removeToken, handleRemoveToken),
    takeEvery(actions.getPersonalToken, handleGetPersonalToken),
    takeEvery(actions.loadProjects, handleRequestProjects),
    takeEvery(actions.requestProjects, handleRequestProjects),
    takeEvery(actions.openProfile, handleOpenProfile),
    takeEvery(actions.openSettings, handleOpenSettings),
    takeEvery(actions.loadTodos, handleRequestTodos),
    takeLatest(actions.requestTodos, handleRequestTodos),
    takeEvery(actions.openTab, handleOpenTab),
    takeEvery(actions.openGitlabTab, handleOpenGitlabTab),
    takeEvery(actions.loadSearchProjects, handleLoadSearchProjects),
    takeLatest(actions.searchProjects, handleSearchProjects),
    takeEvery(actions.pinProject, handlePinProject),
    takeEvery(actions.unpinProject, handleUnpinProject),
    takeEvery(actions.swapPinnedProjects, handleSwapPinnedProjects),
    takeEvery(actions.newIssue, handleNewIssue),
    takeEvery(actions.createIssue, handleCreateIssue),
    takeEvery(actions.openExternalNewIssue, handleOpenExternalNewIssue),
    takeEvery(actions.createIssueSuccess, handleCreateIssueSuccess),
    takeEvery(actions.requestMarkTodoAsDone, handleMarkTodoAsDone),
    takeEvery(actions.requestMarkTodoAsDoneSuccess, handleMarkTodoAsDoneSuccess)
  ]
}
