import { combineReducers } from 'redux'
import issue from './issue'
import user from './user'
import projects, * as fromProjects from './projects'
import favoriteProjects from './favorite-projects'

export default combineReducers({
  issue,
  user,
  projects,
  favoriteProjects
})

export const getVisibleProjects = (state, projectName) =>
  fromProjects.getVisibleProjects(state.projects, projectName)
