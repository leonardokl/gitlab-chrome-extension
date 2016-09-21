export const projectsSelector = (state) =>
  state.projects.list.map(project => {
    project.favorite = (project.id === state.favoriteProjects.projects[project.id])

    return project
  })
