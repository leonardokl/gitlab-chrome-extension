import { put, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as actions from './actions'
import { Pages } from 'constants'
import { notification } from './services'

function* handleLoad () {
  yield delay(1000)
  yield put(actions.setPage({ page: Pages.accessToken }))
}

function* handleRequestUser (action) {
  yield delay(2000)
  yield put(actions.requestUserError({a: 1}))
  notification({title: 'Error', message: 'Invalid token'})
}

export default function* () {
  yield [
    takeEvery(actions.load, handleLoad),
    takeEvery(actions.requestUser, handleRequestUser)
  ]
}
