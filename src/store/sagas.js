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
  gitlabTab,
  getIssueId,
  notification,
  createBranchName
} from 'utils'
import {
  getAccessToken,
  getProjectsNextPage,
  getUser,
  getQuery,
  getSearchNextPage,
  getNewIssueProject
} from './selectors'
import { projectsSchema, todosSchema } from './schemas'

function* handleLoad () {
  try {
    const user = yield chrome.storage.get('user')

    yield put(actions.requestUserSuccess(user))
  } catch (err) {
    console.warn(err)
    yield put(actions.setPage(Pages.accessToken))
  }
}

function* handleRequestUser ({ payload: { accessToken } }) {
  try {
    const { data } = yield gitlab.fetchUser(accessToken)
    const user = { ...data, accessToken }

    yield chrome.storage.set('user', user)
    yield chrome.storage.set('pinnedProjects', [])
    yield put(actions.requestUserSuccess(user))
  } catch (err) {
    console.error(err)
    notification.basic({ title: 'Error', message: 'Invalid token' })
    yield put(actions.requestUserError())
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
      put(actions.requestTodos()),
      put(actions.getOpenedTab())
    ]
  }
}

function* handleRemoveToken () {
  yield chrome.storage.clear()
  yield put(actions.setPage(Pages.accessToken))
  yield put(actions.removeTokenSuccess())
  chrome.clearBadge()
}

function* handleGetPersonalToken () {
  chrome.openTab(Gitlab.personalTokenUrl)
}

function* handleRequestProjects () {
  const [accessToken, page] = yield [
    select(getAccessToken),
    select(getProjectsNextPage)
  ]

  try {
    const response = yield gitlab.fetchProjects({ accessToken, page })
    const nextPage = response.headers['x-next-page']
    const normalizedData = normalize(response.data, projectsSchema)

    yield put(actions.updateEntity(normalizedData))
    yield put(actions.requestProjectsSuccess({ ...normalizedData, nextPage }))
  } catch (err) {
    console.error(err)
    yield put(actions.requestProjectsError())
  }
}

function* handleSearchProjects () {
  const [accessToken, page, query] = yield [
    select(getAccessToken),
    select(getSearchNextPage),
    select(getQuery)
  ]

  try {
    const response = yield gitlab.searchProjects({ accessToken, page, query })
    const nextPage = response.headers['x-next-page']
    const normalizedData = normalize(response.data, projectsSchema)

    yield put(actions.updateEntity(normalizedData))
    yield put(actions.searchProjectsSuccess({ ...normalizedData, nextPage }))
  } catch (err) {
    console.error(err)
    yield put(actions.searchProjectsError())
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

  chrome.openTab(`${Gitlab.url}/${user.username}`)
}

function* handleOpenSettings () {
  chrome.openTab(`${Gitlab.url}/profile`)
}

function* handleRequestTodos () {
  const accessToken = yield select(getAccessToken)

  try {
    const { data } = yield gitlab.fetchTodos(accessToken)
    const normalizedData = normalize(data, todosSchema)
    const count = data.length
    const toBadge = number => number
      ? String(number)
      : ''

    chrome.setBadge(toBadge(count))
    yield put(actions.updateEntity(normalizedData))
    yield put(actions.requestTodosSuccess(normalizedData))
  } catch (err) {
    console.error(err)
  }
}

function* handleOpenTab ({ payload: { url } }) {
  chrome.openTab(url)
}

function* handlePinProject ({ payload }) {
  try {
    const pinnedProjects = yield chrome.storage.get('pinnedProjects')

    chrome.storage.set('pinnedProjects', [payload, ...pinnedProjects])
  } catch (err) {
    console.error(err)
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

function* handleGetOpenedTab () {
  try {
    const tab = yield chrome.getSelectedTab()
    const { url } = tab

    if (isGitlabUrl(url) && isIssueUrl(url)) {
      const issueId = getIssueId(url)
      const branchName = yield gitlabTab.getIssueNewBranchName()

      yield put(actions.setIssueMessage({ id: issueId, branchName}))
    }
  } catch (err) {
    console.error(err)
  }
}

function* handleNewIssue () {
  yield put(actions.setPage(Pages.NEW_ISSUE))
}

function* handleCreateIssue ({ payload: { title, description, assignToMe } }) {
  const [user, accessToken, project] = yield [
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
    const response = yield gitlab.createIssue({ ...form, accessToken })

    yield put(actions.createIssueSuccess(response))
    yield put(actions.setPage(Pages.main))
  } catch (err) {
    console.error(err)
    notification.basic({ title: 'Error', message: err.message})
    yield put(actions.createIssueError())
  }
}

function* handleOpenExternalNewIssue () {
  const { web_url } = yield select(getNewIssueProject)

  yield put(actions.openTab(`${project.web_url}/issues/new?issue`))
}

function* handleCreateIssueSuccess ({ payload: { data: { iid, title } } }) {
   const branchName = createBranchName(iid, title)

   yield put(actions.setIssueMessage({ id: iid, branchName}))
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
    takeEvery(actions.requestTodos, handleRequestTodos),
    takeEvery(actions.openTab, handleOpenTab),
    takeEvery(actions.loadSearchProjects, handleLoadSearchProjects),
    takeLatest(actions.searchProjects, handleSearchProjects),
    takeEvery(actions.pinProject, handlePinProject),
    takeEvery(actions.unpinProject, handleUnpinProject),
    takeEvery(actions.swapPinnedProjects, handleSwapPinnedProjects),
    takeEvery(actions.getOpenedTab, handleGetOpenedTab),
    takeEvery(actions.newIssue, handleNewIssue),
    takeEvery(actions.createIssue, handleCreateIssue),
    takeEvery(actions.openExternalNewIssue, handleOpenExternalNewIssue),
    takeEvery(actions.createIssueSuccess, handleCreateIssueSuccess)
  ]
}
