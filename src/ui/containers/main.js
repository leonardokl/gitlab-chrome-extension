import React from 'react'
import {connect} from 'react-redux'
import * as actions from 'actions'
import {getVisibleProjects} from 'reducers'
import AppBar from 'ui/components/app-bar'
import Projects from 'ui/components/projects'

class Main extends React.Component {
  componentDidMount() {
    this.props.onDidMount()
  }

  render() {
    const {projects, favoriteProjects} = this.props

    return (
      <div>
        <AppBar
          avatarUrl={this.props.user.avatarUrl}
          searching={projects.searching}
          onChangeFilter={this.props.onSearchProjects}
          onClickRemoveToken={this.props.onRemoveAccessToken}
          onFilterProjects={this.props.onFilterProjects}
          onStartProjectsSearch={this.props.onStartProjectsSearch}
        />
        <Projects
          list={projects.list}
          fetching={projects.fetching}
          favoriteProjects={favoriteProjects}
          onAddProjectToFavorites={this.props.onAddProjectToFavorites}
          onCreateNewChromeTab={this.props.onCreateNewChromeTab}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  projects: getVisibleProjects(state),
  favoriteProjects: state.favoriteProjects,
})

const mapDispatchToProps = (dispatch) => ({
  onDidMount: () => {
    dispatch(actions.fetchProjects())
  },
  onToggleProjectFavorite: (projectId) => {
    dispatch(actions.toggleProjectFavorite(projectId))
  },
  onFilterProjects: (projectName) => {
    dispatch(actions.filterProjects(projectName))
  },
  onSearchProjects: (value) => {
    dispatch(actions.searchProjects(value))
  },
  onStartProjectsSearch: () => {
    dispatch(actions.addProjectsLoader())
  },
  onCreateNewChromeTab: (url) => {
    dispatch(actions.createChromeNewTab(url))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
