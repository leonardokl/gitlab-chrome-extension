import { applyMiddleware, compose, createStore } from 'redux'
import reduxSaga from 'redux-saga'
import reducers from './reducers'
import sagas from './sagas'
import { logger } from 'redux-logger'

const __PRODUCTION__ = process.env.NODE_ENV === 'production'

const configureStore = () => {
  const saga = reduxSaga()
  const middlewares = __PRODUCTION__
    ? applyMiddleware(saga)
    : applyMiddleware(saga, logger)

  const store = createStore(reducers, middlewares)

  saga.run(sagas)

  return store
}

export default configureStore()
