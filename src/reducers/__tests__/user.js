/* global describe, it, expect*/

import reducer, {initialState} from 'reducers/user'
import {
  FETCH_ACCESS_TOKEN,
  SAVE_ACCESS_TOKEN_REQUEST,
  SAVE_ACCESS_TOKEN_ERROR,
  SAVE_ACCESS_TOKEN,
  REMOVE_ACCESS_TOKEN
} from 'constants/action-types'

const mockUser = {
  accessToken: 'xxx',
  avatarUrl: 'https://gitlab.com/uploads/user/avatar/168356/eu.jpg',
  email: 'leonardokl@hotmail.com',
  name: 'Leonardo Luiz',
  username: 'leonardokl'
}

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState)
  })

  describe('should handle the action types', () => {
    it('SAVE_ACCESS_TOKEN_REQUEST', () => {
      const state = {...initialState, loading: false}

      expect(
        reducer(state, {
          type: SAVE_ACCESS_TOKEN_REQUEST
        })
      ).toEqual({...initialState, loading: true})
    })

    it('FETCH_ACCESS_TOKEN', () => {
      const state = {...initialState, loading: true}
      const action = {
        type: FETCH_ACCESS_TOKEN,
        data: mockUser
      }

      expect(
        reducer(state, action)
      ).toEqual({...state, ...action.data, loading: false})
    })

    it('SAVE_ACCESS_TOKEN', () => {
      const state = {...initialState, loading: true}
      const action = {
        type: SAVE_ACCESS_TOKEN,
        data: mockUser
      }

      expect(
        reducer(state, action)
      ).toEqual({...state, ...action.data, loading: false})
    })

    it('SAVE_ACCESS_TOKEN_ERROR', () => {
      const state = {...initialState, loading: true}

      expect(
        reducer(state, {
          type: SAVE_ACCESS_TOKEN_ERROR
        })
      ).toEqual({...initialState, loading: false})
    })

    it('REMOVE_ACCESS_TOKEN', () => {
      expect(
        reducer(mockUser, {
          type: REMOVE_ACCESS_TOKEN
        })
      ).toEqual(initialState)
    })
  })
})
