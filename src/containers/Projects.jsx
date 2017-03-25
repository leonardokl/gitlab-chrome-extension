import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'
import { getLoadingProjects, getProjects, getProjectsNextPage } from 'store/selectors'
import { Projects } from 'components'
import { actions } from 'store'

class ProjectsContainer extends PureComponent {
  componentDidMount() {
    this.props.onLoadProjects()
  }

  handleProjectClick = (project) => () => {
    this.props.onOpenProject(project)
  }

  handleActionClick = (project) => (action) => {
    switch (action) {
      case 'newIssue':
        return this.props.onOpenNewIssue(project)

      default:
        console.error(`Unhandled actions ${action}`)
    }
  }

  render () {
    const { loading, nextPage, projects, onNextPage } = this.props

    return (
      <Projects loading={loading} nextPage={!!nextPage} onNextPage={onNextPage}>
        {projects.map(project =>
          <Projects.Item
            key={project.id}
            name={project.name}
            group={project.namespace.name}
            onClick={this.handleProjectClick(project)}
            onActionClick={this.handleActionClick(project)}
          />
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
  onNextPage: actions.requestProjects,
  onOpenProject: actions.openProject,
  onOpenNewIssue: actions.openNewIssue
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer)
