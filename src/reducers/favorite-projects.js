import { handleActions } from 'redux-actions'

export const initialState = {
  result: [],
  projects: {},
}

export default  handleActions({
  FETCH_FAVORITE_PROJECTS: (state, { favoriteProjects }) => ({ ...state, ...favoriteProjects }),
  REMOVE_PROJECT_FROM_FAVORITES: (state, { data: { favoriteProjects } }) => ({
    ...state,
    ...favoriteProjects
  }),
  ADD_PROJECT_TO_FAVORITES: (state, { data: { favoriteProjects } }) => ({
    ...state,
    ...favoriteProjects
  })
}, initialState)
