import app from './app'
import user from './user'
import projects, * as fromProjects from './projects'
import favoriteProjects from './favorite-projects'

export default {
  app,
  user,
  projects,
  favoriteProjects
}

export const getVisibleProjects = (state, projectName) =>
  fromProjects.getVisibleProjects(state.projects, projectName)
