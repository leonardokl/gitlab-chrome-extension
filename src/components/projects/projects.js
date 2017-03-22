import React from 'react'
import cn from 'classnames'
import _ from 'underscore'
import * as ProjectConstants from 'constants/project';
import PerfectScrollBar from 'ui/components/perfect-scrollbar'
import List from 'ui/components/list'
import ProjectItem from './project-item'
import Loader from './loader'
import NotFound from './not-found'

const Projects = (props) => {
  const handleOnClickProject = (evt, url) => {
    evt.stopPropagation()
    props.onCreateNewChromeTab(url)
  }

  const handleOnClickProjectIssue = (evt, url) => {
    evt.stopPropagation()
    props.onCreateNewChromeTab(`${url}/issues/new?issue`)
  }

  const handleActionClick = (item, url) => {
    return props.onCreateNewChromeTab(`${url}/${item.id}`)
  }

  const handleOnClickFavorite = (evt, projectId) => {
    evt.stopPropagation()
    props.onAddProjectToFavorites(projectId)
  }

  const getProjects = () => (
    _.uniq(props.list, project => project.id)
  )

  const renderContent = () => {
    if (!props.list.length && !props.fetching)
      return (<NotFound />)

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
            onActionClick={(item) => handleActionClick(item, project.webUrl)}
            onClickIssue={(evt) => handleOnClickProjectIssue(evt, project.webUrl)}
            onClickFavorite={(evt) => handleOnClickFavorite(evt, project.id)}
          />
        )}
        {props.fetching && <Loader />}
      </List>
    )
  }

  return (
    <PerfectScrollBar>
      {renderContent()}
    </PerfectScrollBar>
  )
}

Projects.propTypes = {
  children: React.PropTypes.array,
}

module.exports = Projects
