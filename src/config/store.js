import thunk from 'redux-thunk'
import reducers from 'reducers'
import {applyMiddleware, createStore, combineReducers} from 'redux'

const configureStore = () =>
    createStore(
      combineReducers(reducers),
      applyMiddleware(thunk)
    )

export default configureStore()
