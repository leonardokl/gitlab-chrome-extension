import React from 'react'
import {connect} from 'react-redux'
import * as actions from 'actions'
import {getVisibleProjects} from 'reducers'

import AccessToken from 'ui/containers/access-token'
import Main from 'ui/containers/main'
import IssueBranchName from 'ui/containers/issue-branch-name'
import './styles/main.styl'

class App extends React.Component {
  componentDidMount() {
    this.props.onDidMount()
  }

  renderContent() {
    const {app, user, projects, favoriteProjects} = this.props

    if (app.issueBranchName)
      return (
        <IssueBranchName
          branchName={this.props.app.issueBranchName}
        />
      )

    if (!user.accessToken)
      return (
        // TODO: connect to state inside of container
        <AccessToken
          loading={user.loading}
          onCreateNewChromeTab={this.props.onCreateNewChromeTab}
          onSave={this.props.onSaveAccessToken}
        />
      )

    return (
      // TODO: connect to state inside of container
      <Main
        user={user}
        projects={projects}
        favoriteProjects={favoriteProjects}
        onDidMount={this.props.onMainDidMount}
        onRemoveAccessToken={this.props.onRemoveAccessToken}
        onChangeFilter={this.props.onSearchProjects}
        onCreateNewChromeTab={this.props.onCreateNewChromeTab}
        onAddProjectToFavorites={this.props.onToggleProjectFavorite}
        onFilterProjects={this.props.onFilterProjects}
        onStartProjectsSearch={this.props.onStartProjectsSearch}
      />
    )
  }

  render() {
    return (
      <div className='container'>
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  app: state.app,
  user: state.user,
  projects: getVisibleProjects(state),
  favoriteProjects: state.favoriteProjects,
})

const mapDispatchToProps = (dispatch) => ({
  onDidMount: () => {
    dispatch(actions.fetchIssueBranchName())
    dispatch(actions.fetchUserAccessToken())
  },
  onMainDidMount: () => {
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
  onSaveAccessToken: (accessToken) => {
    dispatch(actions.saveUserAccessToken(accessToken))
  },
  onRemoveAccessToken: () => {
    dispatch(actions.removeUserAccessToken())
  },
  onCreateNewChromeTab: (url) => {
    dispatch(actions.createChromeNewTab(url))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
