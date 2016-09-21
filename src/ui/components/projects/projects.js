import React from 'react'
import cn from 'classnames'
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

  return (
    <List>
      {props.list.map((project, index) =>
        <ProjectItem
          key={index}
          className={cn('projects__item', {favorite: project.favorite})}
          favorite={project.favorite}
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
