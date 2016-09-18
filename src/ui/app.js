import React from 'react'
import {connect} from 'react-redux'
import * as actions from 'actions'

import AccessToken from 'ui/containers/access-token'
import Main from 'ui/containers/main'
import './styles/main.styl'

class App extends React.Component {
  componentDidMount() {
    this.props.onDidMount()
  }

  get issueBranchName() {
    if (this.props.app.issueBranchName)
      return `git checkout -b ${this.props.app.issueBranchName}`

    return 'Branch name not found'
  }

  renderContent() {
    const {user} = this.props

    if (!user.accessToken) {
      return (
        <AccessToken onSave={this.props.onSaveAccessToken}/>
      )
    }

    return (
      <Main
        user={user}
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
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  onDidMount: () => {
    //dispatch(actions.fetchIssueBranchName())
    dispatch(actions.fetchUserAccessToken())
  },
  onSaveAccessToken: (accessToken) => {
    dispatch(actions.saveUserAccessToken(accessToken))
  },
  onRemoveAccessToken: () => {console.log("app.onRemoveAccessToken")
    dispatch(actions.removeUserAccessToken())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
