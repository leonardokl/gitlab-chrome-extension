import React from 'react'
import {connect} from 'react-redux'
import * as actions from 'actions'

import ClipboardInput from 'ui/components/clipboard-input'
import './styles/main.styl'

class App extends React.Component {
  componentDidMount() {
    this.props.onDidMount()
  }

  render() {
    return (
      <div className='main flex'>
        <ClipboardInput
          value={this.props.app.issueBranchName || 'Branch name not found'}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  app: state.app
})

const mapDispatchToProps = (dispatch) => ({
  onDidMount: () => {
    dispatch(actions.fetchIssueBranchName())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
