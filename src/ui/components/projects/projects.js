import React from 'react'
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

  return (
    <List>
      {props.list.map((project, index) =>
        <ProjectItem
          key={index}
          name={project.name}
          nameSpace={project.nameSpace}
          url={project.webUrl}
          onClick={(evt) => handleOnClickProject(evt, project.webUrl)}
          onClickIssue={(evt) => handleOnClickProjectIssue(evt, project.webUrl)}
        />
      )}
    </List>
  )
}

Projects.propTypes = {
  children: React.PropTypes.array,
}

module.exports = Projects
