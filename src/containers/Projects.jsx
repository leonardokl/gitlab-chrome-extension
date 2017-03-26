import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'
import curry from 'lodash/fp/curry'
import throttle from 'lodash/throttle'
import { getLoadingProjects, getProjects, getProjectsNextPage } from 'store/selectors'
import { Projects } from 'components'
import { actions } from 'store'
import Project from './Project'

class ProjectsContainer extends PureComponent {
  render () {
    const { loading, nextPage, projects, onNextPage } = this.props

    return (
      <Projects
        loading={loading}
        loadingMessage='Loading projects'
        nextPage={!!nextPage}
        onNextPage={onNextPage}
      >
        {projects.map(project =>
          <Project key={project.id} data={project}/>
        )}
      </Projects>
    )
  }
}

ProjectsContainer.propTypes = {
  loading: PropTypes.bool,
  projects: PropTypes.array,
  onLoadProjects: PropTypes.func,
  onNextPage: PropTypes.func
}

const mapStateToProps = state => ({
  loading: getLoadingProjects(state),
  nextPage: getProjectsNextPage(state),
  // projects: getProjects(state)
  projects: []
})

const mapDispatchToProps = ({
  onLoadProjects: actions.loadProjects,
  onNextPage: actions.requestProjects
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer)
