import React from 'react'
import List from 'ui/components/list'
import ProjectItem from './project-item'

const Projects = (props) => {
  const handleOnClickProject = (url) => {
    props.onCreateNewChromeTab(url)
  }
  const handleOnClickProjectIssue = (url) => {
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
          onClick={() => handleOnClickProject(project.webUrl)}
          onClickIssue={() => handleOnClickProjectIssue(project.webUrl)}
        />
      )}
    </List>
  )
}

Projects.propTypes = {
  children: React.PropTypes.array,
}

module.exports = Projects
