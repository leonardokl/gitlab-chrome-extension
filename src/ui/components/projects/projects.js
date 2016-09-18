import React from 'react'
import List from 'ui/components/list'
import ProjectItem from './project-item'

const Projects = (props) => (
  <List>
    {props.list.map((project, index) =>
      <ProjectItem
        key={index}
        name={project.name}
        nameSpace={project.nameSpace}
        url={project.webUrl}
      />
    )}
  </List>
)

Projects.propTypes = {
  children: React.PropTypes.array,
}

module.exports = Projects
