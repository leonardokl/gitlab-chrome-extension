/* global afterEach, describe, it, expect*/

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import store from 'config/store'
import * as ActionTypes from 'constants/action-types'
import * as actions from 'actions'

describe('actions', () => {
  describe('fetchUserAccessToken', () => {
    const api = {
      chrome: {
        getStorage: () => Promise.resolve({data: {}})
      }
    }
    const middlewares = [thunk.withExtraArgument({api})]
    const mockStore = configureMockStore(middlewares)

    it('should create the action FETCH_ACCESS_TOKEN', () => {
      const store = mockStore({})
      const expectedActions = [
        {type: ActionTypes.FETCH_ACCESS_TOKEN, data: {}}
      ]

      return store.dispatch(actions.fetchUserAccessToken())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
  })

  describe('saveUserAccessTokenRequest', () => {
    it('should create the action SAVE_ACCESS_TOKEN_REQUEST', () => {
      const expectedAction = {
        type: ActionTypes.SAVE_ACCESS_TOKEN_REQUEST
      }

      expect(
        store.dispatch(actions.saveUserAccessTokenRequest())
      ).toEqual(expectedAction)
    })
  })

  describe('saveUserAccessTokenError', () => {
    it('should create the action SAVE_ACCESS_TOKEN_ERROR', () => {
      const expectedAction = {
        type: ActionTypes.SAVE_ACCESS_TOKEN_ERROR
      }

      expect(
        store.dispatch(actions.saveUserAccessTokenError())
      ).toEqual(expectedAction)
    })
  })

  describe('fetchFavoriteProjects', () => {
    it('should create the action FETCH_FAVORITE_PROJECTS', () => {
      const expectedAction = {
        type: ActionTypes.FETCH_FAVORITE_PROJECTS,
      }

      expect(
        store.dispatch(actions.fetchFavoriteProjects())
      ).toEqual(expectedAction)
    })
  })

  describe('addProjectsLoader', () => {
    it('should create the action ADD_PROJECTS_LOADER', () => {
      const expectedAction = {
        type: ActionTypes.ADD_PROJECTS_LOADER,
      }

      expect(
        store.dispatch(actions.addProjectsLoader())
      ).toEqual(expectedAction)
    })
  })

  describe('fetchProjectsRequest', () => {
    it('should create the action FETCH_GITLAB_PROJECTS_REQUEST', () => {
      const expectedAction = {
        type: ActionTypes.FETCH_GITLAB_PROJECTS_REQUEST,
      }

      expect(
        store.dispatch(actions.fetchProjectsRequest())
      ).toEqual(expectedAction)
    })
  })

  describe('filterProjects', () => {
    it('should create the action FILTER_PROJECTS', () => {
      const expectedAction = {
        type: ActionTypes.FILTER_PROJECTS,
        data: {name: 'ui'}
      }

      expect(
        store.dispatch(actions.filterProjects('ui'))
      ).toEqual(expectedAction)
    })
  })

  describe('searchProjectsRequest', () => {
    it('should create the action FETCH_GITLAB_PROJECTS_REQUEST', () => {
      const expectedAction = {
        type: ActionTypes.SEARCH_GITLAB_PROJECTS_REQUEST,
      }

      expect(
        store.dispatch(actions.searchProjectsRequest())
      ).toEqual(expectedAction)
    })
  })
})
