import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'
import { Icon, Button, Divider } from 'semantic-ui-react'
import curry from 'lodash/fp/curry'
import throttle from 'lodash/throttle'
import { Scrollbars } from 'react-custom-scrollbars'
import { getLoadingProjects, getProjects, getProjectsNextPage, getIssueMessage } from 'store/selectors'
import { Projects, FlexContainer, FlexItem, IssueMessage } from 'components'
import { actions } from 'store'
import { when } from 'utils'
import ProjectDnD from './ProjectDnD'

class ProjectsContainer extends PureComponent {
  handleScrollBottom = throttle(() => {
    const { loading, nextPage, onNextPage } = this.props

    when(!loading && !!nextPage, onNextPage)
  }, 300)

  render () {
    const { loading, nextPage, projects, issueMessage, onNextPage } = this.props

    return (
      <FlexContainer fluid column customScroll onScrollBottom={this.handleScrollBottom}>
        { !!issueMessage &&
          <IssueMessage
            title={`Issue #${issueMessage.id}`}
            branchName={issueMessage.branchName}
          />
        }
        <Projects
          loading={loading}
          loadingMessage='Loading projects'
          nextPage={!!nextPage}
          onNextPage={onNextPage}
        >
          {projects.map(project =>
            <ProjectDnD key={project.id} data={project}/>
          )}
        </Projects>
      </ FlexContainer>
    )
  }
}

ProjectsContainer.propTypes = {
  loading: PropTypes.bool,
  projects: PropTypes.array,
  issueMessage: PropTypes.object,
  onLoadProjects: PropTypes.func,
  onNextPage: PropTypes.func
}

const mapStateToProps = state => ({
  loading: getLoadingProjects(state),
  nextPage: getProjectsNextPage(state),
  projects: getProjects(state),
  issueMessage: getIssueMessage(state)
})

const mapDispatchToProps = ({
  onLoadProjects: actions.loadProjects,
  onNextPage: actions.requestProjects
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer)
