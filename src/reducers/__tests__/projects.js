/* global describe, it, expect*/

import reducer, {initialState} from 'reducers/projects'
import {
  FETCH_FAVORITE_PROJECTS,
  FETCH_GITLAB_PROJECTS,
  FETCH_GITLAB_PROJECTS_REQUEST,
  ADD_PROJECTS_LOADER,
  FILTER_PROJECTS,
  SEARCH_GITLAB_PROJECTS,
  SEARCH_GITLAB_PROJECTS_REQUEST
} from 'constants/action-types'

describe('projects reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState)
  })

  describe('should handle the action types', () => {
    it('FETCH_FAVORITE_PROJECTS', () => {
      const action = {
        type: FETCH_FAVORITE_PROJECTS,
        denormalizedFavoriteProjects: ''
      }

      expect(
        reducer(initialState, action)
      ).toEqual({...initialState, list: action.denormalizedFavoriteProjects})
    })

    it('FETCH_GITLAB_PROJECTS', () => {
      const action = {
        type: FETCH_GITLAB_PROJECTS,
        data: ''
      }

      expect(
        reducer(initialState, action)
      ).toEqual({
        ...initialState,
        list: action.data,
        searching: false,
        fetching: false
      })
    })

    it('SEARCH_GITLAB_PROJECTS', () => {
      const action = {
        type: SEARCH_GITLAB_PROJECTS,
        data: ''
      }

      expect(
        reducer(initialState, action)
      ).toEqual({
        ...initialState,
        list: action.data,
        searching: false,
        fetching: false
      })
    })

    it('FETCH_GITLAB_PROJECTS_REQUEST', () => {
      expect(
        reducer(initialState, {type: FETCH_GITLAB_PROJECTS_REQUEST})
      ).toEqual({...initialState, fetching: true})
    })

    it('ADD_PROJECTS_LOADER', () => {
      expect(
        reducer(initialState, {type: ADD_PROJECTS_LOADER})
      ).toEqual({...initialState, fetching: true})
    })

    it('FILTER_PROJECTS', () => {
      const action = {
        type: FILTER_PROJECTS,
        data: {name: 'project-name'}
      }

      expect(
        reducer(initialState, action)
      ).toEqual({...initialState, filter: action.data.name})
    })

    it('SEARCH_GITLAB_PROJECTS_REQUEST', () => {
      expect(
        reducer(initialState, {type: SEARCH_GITLAB_PROJECTS_REQUEST})
      ).toEqual({...initialState, searching: true})
    })
  })
})
