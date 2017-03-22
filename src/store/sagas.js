import { takeEvery } from 'redux-saga/effects'
import * as actions from './actions'

function* handleLoad () {
  console.log('LOAD')
}

export default function* () {
  yield [
    takeEvery(actions.load, handleLoad)
  ]
}
