import React from 'react'
import {connect} from 'react-redux'
import * as actions from 'actions'

import AccessToken from 'ui/containers/access-token'
import Main from 'ui/containers/main'
import ClipboardInput from 'ui/components/clipboard-input'
import './styles/main.styl'

class App extends React.Component {
  componentDidMount() {
    this.props.onDidMount()
  }

  renderContent() {
    const {app, user, projects} = this.props

    if (app.issueBranchName)
      return (
        <ClipboardInput
          value={`git checkout -b ${this.props.app.issueBranchName}`}
        />
      )

    if (!user.accessToken)
      return (
        <AccessToken onSave={this.props.onSaveAccessToken}/>
      )

    return (
      <Main
        user={user}
        projects={projects}
        onDidMount={this.props.onMainDidMount}
        onRemoveAccessToken={this.props.onRemoveAccessToken}
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
  onSaveAccessToken: (accessToken) => {
    dispatch(actions.saveUserAccessToken(accessToken))
  },
  onRemoveAccessToken: () => {
    dispatch(actions.removeUserAccessToken())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
