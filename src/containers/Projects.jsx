import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'
import { getLoadingProjects, getProjects, getProjectsNextPage } from 'store/selectors'
import { Projects } from 'components'
import { actions } from 'store'

class ProjectsContainer extends PureComponent {
  componentDidMount() {
    this.props.onLoadProjects()
  }

  handleProjectClick = (project) => (evt) => {
  }

  render () {
    const { loading, nextPage, projects, onNextPage } = this.props

    return (
      <Projects loading={loading} nextPage={!!nextPage} onNextPage={onNextPage}>
        {projects.map(project =>
          <div
            key={project.id}
            onClick={this.handleProjectClick(project)}
          >
            {project.name}
          </div>
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
  projects: getProjects(state)
})

const mapDispatchToProps = ({
  onLoadProjects: actions.loadProjects,
  onNextPage: actions.requestProjects
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer)
