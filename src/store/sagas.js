import { put, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as actions from './actions'
import { Pages, Gitlab } from 'constants'
import { notification } from './services'
import { chrome, gitlab } from 'utils'

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

export default function* () {
  yield [
    takeEvery(actions.load, handleLoad),
    takeEvery(actions.requestUser, handleRequestUser),
    takeEvery(actions.removeToken, handleRemoveToken),
    takeEvery(actions.getPersonalToken, handleGetPersonalToken)
  ]
}
