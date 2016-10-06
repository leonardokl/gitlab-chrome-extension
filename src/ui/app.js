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
    const {issue, user} = this.props

    if (issue.branch)
      return (
        <IssueBranchName
          branchName={this.props.issue.branch}
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
      <Main />
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
  issue: state.issue,
  user: state.user,
})

const mapDispatchToProps = (dispatch) => ({
  onDidMount: () => {
    dispatch(actions.fetchIssueBranchName())
    dispatch(actions.fetchUserAccessToken())
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
