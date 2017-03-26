import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'
import curry from 'lodash/fp/curry'
import throttle from 'lodash/throttle'
import { getLoadingSearch, getSearchProjects, getSearchNextPage } from 'store/selectors'
import { Projects } from 'components'
import { actions } from 'store'
import Project from './Project'

class SearchContainer extends PureComponent {
  render () {
    const { loading, nextPage, projects, onNextPage } = this.props

    return (
      <Projects
        loading={loading}
        loadingMessage='Searching'
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

SearchContainer.propTypes = {
  loading: PropTypes.bool,
  projects: PropTypes.array,
  onLoadProjects: PropTypes.func,
  onNextPage: PropTypes.func
}

const mapStateToProps = state => ({
  loading: getLoadingSearch(state),
  nextPage: getSearchNextPage(state),
  projects: getSearchProjects(state)
})

const mapDispatchToProps = ({
  onNextPage: actions.searchProjects
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)
