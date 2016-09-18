import React from 'react'
import List from 'ui/components/list'
import ProjectItem from './project-item'

const Projects = (props) => (
  <List>
    {[1,2,3,4,5,6].map((item, index) =>
      <ProjectItem
        key={index}
        name='html-scraper-planet-node-js'
        nameSpace='Leonardo Luiz'
      />
    )}
  </List>
)

Projects.propTypes = {
  children: React.PropTypes.array,
}

module.exports = Projects
