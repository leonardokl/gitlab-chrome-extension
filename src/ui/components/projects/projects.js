import React from 'react'
import cn from 'classnames'
import _ from 'underscore'
import List from 'ui/components/list'
import ProjectItem from './project-item'

const Projects = (props) => {
  const handleOnClickProject = (evt, url) => {
    evt.stopPropagation()
    props.onCreateNewChromeTab(url)
  }

  const handleOnClickProjectIssue = (evt, url) => {
    evt.stopPropagation()
    props.onCreateNewChromeTab(`${url}/issues/new?issue`)
  }

  const handleOnClickFavorite = (evt, projectId) => {
    evt.stopPropagation()
    props.onAddProjectToFavorites(projectId)
  }

  const getProjects = () => (
    _.uniq(props.list, project => project.id)
      .filter((project, index) => index < 6)
  )

  return (
    <List>
      {getProjects().map((project, index) =>
        <ProjectItem
          key={index}
          className={cn('projects__item', {
            favorite: !!(props.favoriteProjects.projects[project.id])
          })}
          favorite={!!(props.favoriteProjects.projects[project.id])}
          name={project.name}
          nameSpace={project.nameSpace}
          url={project.webUrl}
          onClick={(evt) => handleOnClickProject(evt, project.webUrl)}
          onClickIssue={(evt) => handleOnClickProjectIssue(evt, project.webUrl)}
          onClickFavorite={(evt) => handleOnClickFavorite(evt, project.id)}
        />
      )}
    </List>
  )
}

Projects.propTypes = {
  children: React.PropTypes.array,
}

module.exports = Projects
