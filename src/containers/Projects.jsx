import React, { PropTypes, PureComponent } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { connect } from 'react-redux'
import curry from 'lodash/fp/curry'
import throttle from 'lodash/throttle'
import { Scrollbars } from 'react-custom-scrollbars'
import { getLoadingProjects, getProjects, getProjectsNextPage } from 'store/selectors'
import { Projects, FlexContainer, FlexItem } from 'components'
import { actions } from 'store'
import { when } from 'utils'
import ProjectDnD from './ProjectDnD'

class ProjectsContainer extends PureComponent {
  handleScrollBottom = throttle(() => {
    const { loading, nextPage, onNextPage } = this.props

    when(!loading && !!nextPage, onNextPage)
  }, 300)

  render () {
    const { loading, nextPage, projects, onNextPage } = this.props

    return (
      <FlexContainer fluid column customScroll onScrollBottom={this.handleScrollBottom}>
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

// const ProjectsContainerDnD = DragDropContext(HTML5Backend)(ProjectsContainer)

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer)
