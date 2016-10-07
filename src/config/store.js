import thunk from 'redux-thunk'
import reducers from 'reducers'
import {applyMiddleware, createStore, combineReducers} from 'redux'
import api from 'api'

const configureStore = () =>
    createStore(
      combineReducers(reducers),
      applyMiddleware(
        thunk.withExtraArgument({api})
      )
    )

export default configureStore()
