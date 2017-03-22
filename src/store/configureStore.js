import { applyMiddleware, compose, createStore } from 'redux'
import reduxSaga from 'redux-saga'
import reducers from './reducers'
import sagas from './sagas'
import { devToolsExtension } from 'utils'

const __PRODUCTION__ = process.env.NODE_ENV === 'production'

const configureStore = () => {
  const saga = reduxSaga()
  const middlewares = applyMiddleware(saga)

  const options = __PRODUCTION__
    ? middlewares
    : compose(middlewares, devToolsExtension())

  const store = createStore(reducers, options)

  saga.run(sagas)

  return store
}

export default configureStore()
