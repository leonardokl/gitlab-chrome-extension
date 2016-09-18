import {
  FETCH_ACCESS_TOKEN,
  SAVE_ACCESS_TOKEN,
  REMOVE_ACCESS_TOKEN
} from 'constants/action-types'

const initialState = {
  accessToken: null,
  avatarUrl: null,
  name: null,
  username: null,
  email: null
}

const user = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_ACCESS_TOKEN:
  case SAVE_ACCESS_TOKEN:
    return action.data
  case REMOVE_ACCESS_TOKEN:
    return initialState
  }

  return state
}

export default user
