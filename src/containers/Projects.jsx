import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'
import curry from 'lodash/fp/curry'
import throttle from 'lodash/throttle'
import { getLoadingProjects, getProjects, getProjectsNextPage } from 'store/selectors'
import { Projects } from 'components'
import { actions } from 'store'

class ProjectsContainer extends PureComponent {
  componentDidMount() {
    this.props.onLoadProjects()
  }

  handleProjectClick = (project) => () => {
    this.handleAction(project, 'open')
  }

  handleAction = curry((project, action) => {
    const { onOpenTab } = this.props
    const { web_url, default_branch } = project

    switch (action) {
      case 'open':
        return onOpenTab(`${web_url}`)
      case 'newIssue':
        return onOpenTab(`${web_url}/issues/new?issue`)
      case 'code':
        return onOpenTab(`${web_url}/tree/${default_branch}`)
      case 'branches':
        return onOpenTab(`${web_url}/branches`)
      case 'issues':
        return onOpenTab(`${web_url}/issues`)

      default:
        console.error(`Unhandled action ${action}`)
    }
  })

  handleScrollLimit = throttle(() => {
    const { loading, nextPage, onNextPage } = this.props

    if (!loading && !!nextPage) onNextPage()
  }, 300)

  render () {
    const { loading, nextPage, projects, onNextPage } = this.props

    return (
      <Projects
        loading={loading}
        nextPage={!!nextPage}
        onNextPage={onNextPage}
        onScrollLimit={this.handleScrollLimit}
      >
        {projects.map(project =>
          <Projects.Item
            key={project.id}
            name={project.name}
            group={project.namespace.name}
            onClick={this.handleProjectClick(project)}
            onActionClick={this.handleAction(project)}
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
  onOpenTab: actions.openTab
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer)
