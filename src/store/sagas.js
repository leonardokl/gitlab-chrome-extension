import { put, select, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { normalize, schema, arrayOf } from 'normalizr'
import * as actions from './actions'
import { Pages, Gitlab } from 'constants'
import { notification } from './services'
import { chrome, gitlab } from 'utils'
import { getAccessToken, getProjectsNextPage } from './selectors'

function* handleLoad () {
  try {
    const user = yield chrome.storage.get('user')

    yield [
      put(actions.requestUserSuccess(user)),
      put(actions.setPage({ page: Pages.main }))
    ]
  } catch (err) {
    console.warn(err)
    yield put(actions.setPage({ page: Pages.accessToken }))
  }

  // testing
  // chrome.browserAction.setBadgeText({text: "2"})
}

function* handleRequestUser ({ payload: { accessToken } }) {
  try {
    const { data } = yield gitlab.fetchUser(accessToken)
    const user = { ...data, accessToken }

    yield chrome.storage.set('user', user)
    yield put(actions.requestUserSuccess(user))
    yield put(actions.setPage({ page: Pages.main }))
  } catch (err) {
    console.error(err)
    notification({ title: 'Error', message: 'Invalid token' })
    yield put(actions.requestUserError())
  }
}

function* handleRemoveToken () {
  yield chrome.storage.clear()
  yield put(actions.setPage({ page: Pages.accessToken }))
  yield put(actions.removeTokenSuccess())
}

function* handleGetPersonalToken () {
  chrome.openTab(Gitlab.personalTokenUrl)
}

function* handleRequestProjects () {
  const [accessToken, page] = yield [
    select(getAccessToken),
    select(getProjectsNextPage)
  ]
  const project = new schema.Entity('projects');

  try {
    const response = yield gitlab.fetchProjects({ accessToken, page })
    const nextPage = response.headers['x-next-page']
    const normalizedData = normalize(response.data, [project])

    yield put(actions.updateEntity(normalizedData))
    yield put(actions.requestProjectsSuccess({ ...normalizedData, nextPage }))
  } catch (err) {
    console.error(err)
    yield put(actions.requestProjectsError())
  }
}

export default function* () {
  yield [
    takeEvery(actions.load, handleLoad),
    takeEvery(actions.requestUser, handleRequestUser),
    takeEvery(actions.removeToken, handleRemoveToken),
    takeEvery(actions.getPersonalToken, handleGetPersonalToken),
    takeEvery(actions.loadProjects, handleRequestProjects),
    takeEvery(actions.requestProjects, handleRequestProjects)
  ]
}
