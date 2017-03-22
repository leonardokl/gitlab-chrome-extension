import { handleActions } from 'redux-actions'

export const initialState = {
  accessToken: null,
  avatarUrl: null,
  name: null,
  username: null,
  email: null,
  loading: false
}

export default handleActions({
  FETCH_ACCESS_TOKEN: (state, { data }) => ({ ...data, loading: false }),
  SAVE_ACCESS_TOKEN: (state, { data }) => ({ ...data, loading: false }),
  SAVE_ACCESS_TOKEN_REQUEST: (state) => ({ ...state, loading: true }),
  SAVE_ACCESS_TOKEN_ERROR: (state) => ({ ...state, loading: false }),
  REMOVE_ACCESS_TOKEN: () => initialState
}, initialState)

