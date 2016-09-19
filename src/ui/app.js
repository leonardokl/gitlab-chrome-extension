import React from 'react'
import {connect} from 'react-redux'
import * as actions from 'actions'

import AccessToken from 'ui/containers/access-token'
import Main from 'ui/containers/main'
import IssueBranchName from 'ui/containers/issue-branch-name'
import './styles/main.styl'

class App extends React.Component {
  componentDidMount() {
    this.props.onDidMount()
  }

  renderContent() {
    const {app, user, projects} = this.props

    if (app.issueBranchName)
      return (
        <IssueBranchName
          branchName={this.props.app.issueBranchName}
        />
      )

    if (!user.accessToken)
      return (
        <AccessToken
          loading={user.loading}
          onCreateNewChromeTab={this.props.onCreateNewChromeTab}
          onSave={this.props.onSaveAccessToken}
        />
      )

    return (
      <Main
        user={user}
        projects={projects}
        onDidMount={this.props.onMainDidMount}
        onRemoveAccessToken={this.props.onRemoveAccessToken}
        onChangeFilter={this.props.onSearchProjects}
        onCreateNewChromeTab={this.props.onCreateNewChromeTab}
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
  projects: state.projects
})

const mapDispatchToProps = (dispatch) => ({
  onDidMount: () => {
    dispatch(actions.fetchIssueBranchName())
    dispatch(actions.fetchUserAccessToken())
  },
  onMainDidMount: () => {
    dispatch(actions.fetchProjects())
  },
  onSearchProjects: (value) => {
    dispatch(actions.searchProjects(value))
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
