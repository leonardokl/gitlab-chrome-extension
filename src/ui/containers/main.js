import React from 'react'
import AppBar from 'ui/components/app-bar'
import Projects from 'ui/components/projects'

class Main extends React.Component {
  render() {
    return (
      <div>
        <AppBar
          avatarUrl={this.props.user.avatarUrl}
          onClickRemoveToken={this.props.onRemoveAccessToken}
        />
        <Projects />
      </div>
    )
  }
}

export default Main
